import { ReactChild } from 'react'
import { Box, HStack, Stack, Spacer, Flex, IconButton, Button, useBreakpointValue } from '@chakra-ui/react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { Logo } from './Logo'
import lines from '../img/lines.svg'
import { useRouter } from 'next/router'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL

export interface LayoutProps {
  name?: string
  desc?: string
  children: ReactChild|ReactChild[]
}

const NAV: { title: string, link: string }[] = []

export function Layout ({ children, name, desc }: LayoutProps) {
  const isMobile = useBreakpointValue([true, true, false])
  const router = useRouter()

  const navEl = NAV.map(({ title, link }) => {
    return (
      <Box  key={title} color={router.route.startsWith(link) ? 'brand.600' : undefined} _hover={{
        color: 'brand',
      }}>
        <Link href={link}>
          {title}
        </Link>
      </Box>
    )
  })

  const canonicalTitle = `${name} | Magical request queues for serverless`
  const canonicalDescription = `${desc}. Schedule, queue, delay and/or asynchronous serverless functions or API endpoints. Get setup in under 5 minutes.`

  return (
    <>
      <Head>
        {name && (<title>{canonicalTitle}</title>)}
        {name && ( <meta property="og:title" content={canonicalTitle} key="og:title" />)}
        {desc && (<meta property="og:description" content={canonicalDescription} key="og:description" />)}
      </Head>
      <Sidebar
        disable={!isMobile}
        content={(
          <Box p={6}>
            <Stack spacing={8}>
              <Logo />
              <Stack spacing={4}>
                {navEl}
              </Stack>
            </Stack>
          </Box>
        )}>
        {({ onOpen }) => (
          <Box>
            {/* <Banner /> */}
            <Box px={4} py={4}>
              <HStack position='relative' spacing={4}>
                <Box flex='0 0 auto'>
                  <Logo />
                </Box>
                <Spacer />
                <Box>
                  {isMobile ? (
                    <Box width={'48px'} position='absolute' right={1} top={-1}>
                      <IconButton
                        borderRadius='full'
                        onClick={onOpen}
                        aria-label='menu'
                        size='lg'
                        icon={<Image src={lines} alt='menu' width={24} />}
                      />
                    </Box>
                  ) : (
                    <HStack spacing={8}>
                      {isMobile ? <></> : (
                        <HStack color='gray.800' fontWeight='bold' fontSize='md' spacing={8}>
                          {navEl}
                        </HStack>
                      )}
                    </HStack>
                  )}
                </Box>
              </HStack>
            </Box>
            <Box minH='100vh'>
              {children}
            </Box>
            <Footer />
          </Box>
        )}
      </Sidebar>
    </>
  )
}
