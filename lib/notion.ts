import { Client } from '@notionhq/client'
import axios from 'axios'
import sizeOf from 'image-size'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  })
  const pages = await Promise.all(response.results.map(async (res: any) => {
    const blocks = await getBlocks(res.id)
    const image = blocks.find(({ type }) => type === 'image')
    return {
      date: res.properties.date?.date?.start ?? res.last_edited_time,
      image,
      slug: res.properties.slug?.rich_text?.[0]?.plain_text,
      ...res,
    }
  }))
  return pages.filter(({ properties }) => properties.published.checkbox === true)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export const getPageBySlug  = async (databaseId: string, slug: string) => {
  const database = await getDatabase(databaseId)
  return database.find((page) => page.slug === slug)
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (blockId: string) => {
  const blocks = []
  let cursor: string|undefined
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    })
    blocks.push(...results)
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }

  return Promise.all(blocks.map(async (block: any) => {
    if (block.type !== 'image') return block
    const url = block.image?.file?.url ?? block.image?.external?.url
    const res = await axios({
      url,
      responseType: 'arraybuffer',
    })
    const { width, height } = sizeOf(res.data)
    return {
      ...block,
      image: {
        ...block.image,
        width,
        height,
      },
    }
  }))
}
