import { Fragment } from 'react'
import Head from 'next/head'
import { Heading, Box, Container, Stack } from '@chakra-ui/react'
import { getDatabase, getPage, getBlocks, getPageBySlug } from '../lib/notion'
import Link from 'next/link'
import { NotionText } from '../components/notion/NotionText'
import { NotionBlock } from '../components/notion/NotionBlock'
import styles from '../components/notion/post.module.css'
import markdownStyles from '../styles/markdown-styles.module.css'
import { Layout } from '../components/Layout'

const databaseId = 'eee64cdfb9934e21bd03c7e1827bb189'


export default function Post ({ page, blocks }: any) {
  if (!page || !blocks) {
    return <div />
  }

  const imageBlock = blocks.find(({ type }: any) => type === 'image')

  const title = `${page.properties.Name.title[0].plain_text} | MildInsanityTakesTime`
  const desc = page.properties.summary.rich_text[0].plain_text
  const image = imageBlock.image?.file?.url ?? imageBlock.image?.external?.url

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} key="title"/>
        <meta name="description" content={desc} key="description"/>

        <meta property="og:type" content="website" key="og:type"/>
        <meta property="og:title" content={title} key="og:title"/>
        <meta property="og:description" content={desc} key="og:description" />
        <meta property="og:image" content={image} key="og:image"/>

        <meta property="twitter:card" content="summary_large_image" key="twitter:card"/>
        <meta property="twitter:title" content={title} key="twitter:title"/>
        <meta property="twitter:description" content={desc} key="twitter:description"/>
        <meta property="twitter:image" content={image} key="twitter:image"/>
      </Head>

      <Container maxW='3xl' mt={20}>
        <article>
          <Stack spacing={8}>
            <Heading fontSize='3em'>
              <NotionText text={page.properties.Name.title} />
            </Heading>
            <section className={markdownStyles['markdown']}>
              {blocks.map((block: any) => (
                <NotionBlock key={block.id} block={block} />
              ))}
            </section>
          </Stack>
        </article>
        <Box mt={10}>
          <Link href="/">
            <a className={styles.back}>← Go home</a>
          </Link>
        </Box>
      </Container>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId)
  return {
    paths: database.map((page) => ({ params: { slug: page.slug } })),
    fallback: true,
  }
}

export const getStaticProps = async (context: any) => {
  const { slug } = context.params
  const page = await getPageBySlug(databaseId, slug)
  const blocks = await getBlocks(page.id)

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block: any) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        }
      })
  )

  const blocksWithChildren = blocks.map((block: any) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find(
        (x) => x.id === block.id
      )?.children
    }
    return block
  })

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  }
}