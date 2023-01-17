import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Inter } from '@next/font/google'
import { Container, Box, Text} from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'
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
        backgroundImage={useColorModeValue("white", "animatedBackground.svg")}
        >
        <Container>
          <NavBar/>
          <LazyVisualizer/>
        </Container>
        <Box
          height="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
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
              Something Something Something Something Something Something <Text
                fontSize="6xl"
                bgGradient={useColorModeValue("linear(to-r, #9B9B9B, #87D8C8)",'linear(to-r, #F9A824, #87D8C8)' )}
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
