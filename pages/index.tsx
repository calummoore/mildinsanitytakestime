import Head from 'next/head'
import Link from 'next/link'
import { Box, Heading, Container, Stack, Divider } from '@chakra-ui/react'
import { Layout } from '../components/Layout'
import { getDatabase } from '../lib/notion'
import { NotionText } from '../components/notion/NotionText'
import { NotionBlock } from '../components/notion/NotionBlock'

export const databaseId = 'eee64cdfb9934e21bd03c7e1827bb189'

export default function Home ({ posts }: any) {
  return (
    <Layout>
      <Container maxW='container.lg' mt={14}>
        <Stack spacing={12} divider={<Divider />}>
          <Stack divider={<Divider />} maxW='2xl'>
            {posts.map((post: any) => {
              const date = new Date(post.properties.date?.date?.start ?? post.last_edited_time).toLocaleString(
                'en-US',
                {
                  weekday: 'long',
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                }
              )
              return (
                <Stack key={post.id} spacing={4}>
                  <Box color='gray.600'>{date}</Box>
                  <Link href={`/${post.slug}`} passHref>
                    <a>
                      <Stack spacing={4}>
                        <Heading as='h3' size='lg' _hover={{ textDecoration: 'underline' }}>
                          <NotionText text={post.properties.Name.title} />
                        </Heading>
                        {post.image && (
                          <NotionBlock block={post.image} />
                        )}
                      </Stack>
                    </a>
                  </Link>
                  <Box color='gray.700' lineHeight={1.6}>
                    <NotionText text={post.properties.summary.rich_text} />
                  </Box>
                  <Box color='blue.500'>
                    <Link href={`/${post.slug}`}>
                      <a> Read post →</a>
                    </Link>
                  </Box>
                </Stack>
              )
            })}
          </Stack>
        </Stack>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId)

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  }
}