import { Box } from '@chakra-ui/react'

export function Footer () {
  return (
    <Box mt={'10em'} color='gray.800' py={2} px={3} borderTop='1px solid #eee'>
      © Copyright {(new Date()).getFullYear()} MildInsanityTakesTime
    </Box>
  )
}