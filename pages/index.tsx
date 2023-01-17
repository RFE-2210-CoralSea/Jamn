import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Inter } from '@next/font/google'
import { Container, Box, Text} from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'
import {HomeNavBar} from '../components/HomeNavBar'
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react'

const LazyVisualizer = dynamic(() => import('../components/AudioVisualizer'), {
  ssr: false
})
const inter = Inter({ subsets: ['latin'] })

const innerBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: 'full',
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
  }


export default function Home() {

  return (
    <>
      <Head>
        <title>Blue-Ocean</title>
      </Head>

      <Box
        height="100vh"
        background="center/cover"
        backgroundImage={useColorModeValue("white", "animatedBackground.svg")}
        backgroundRepeat="no-repeat"
        >
        <Container border="1px">
          <HomeNavBar/>
          <LazyVisualizer/>
        </Container>
        <Box
          height="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          <Container
            border="1px"
            width="200px"
            height="200px"
            bgColor="transparent"
          >
          </Container>
          <Container
            border="1px"
            borderBottomLeftRadius="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text textAlign="center" fontSize="3xl">
              Something Something Something Something Something Something <Text as="span"
                fontSize="6xl"
                fontWeight="extrabold"
                bgGradient={useColorModeValue('linear(to-r, #F9A824, #87D8C8)',"linear(to-r, #9B9B9B, #87D8C8)" )}
                bgClip='text'
              >
                  Sonically Inclined
              </Text>
            </Text>
          </Container>
        </Box>
      </Box>
    </>
  )
}
