import { Box, Link, Text } from '@chakra-ui/react'

export function Banner () {
  return (
    <Link isExternal href='https://www.producthunt.com/posts/this-interview-does-not-exist-1' textDecoration='none !important'>
      <Box p={3} color='white' bg='rgb(218, 85, 47)' fontSize='lg'>
        <Text as='span' fontWeight='bold'>We&apos;re trending on ProductHunt</Text>
        <Text as='span' ml={2}>Please check us out and get involved!</Text>
      </Box>
    </Link>
  )
}