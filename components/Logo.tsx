import { Center, Heading, Box } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../img/logo.svg'

export interface LogoProps {
  href?: string
  width?: string
  height?: string
  onClick?: () => void
}

export function Logo ({ href = '/', width = '120px', height = '34px', onClick }: LogoProps) {
  return (
    <Link href={href}>
      <a onClick={onClick}>
        <Center>
          <Heading fontSize={['lg', '2xl', '2xl']}>
            Mild
            <Box as='span' color='gray.200'>/</Box>Insanity
            <Box as='span' color='gray.200'>/</Box>Takes
            <Box as='span' color='gray.200'>/</Box>Time
          </Heading>
        </Center>
      </a>
    </Link>
  )
}