import Head from 'next/head'
import { Container, Box, Text} from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'
<<<<<<< HEAD
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import {  unstable_getServerSession} from "next-auth/next";


const LazyVisualizer = dynamic(() => import('../components/AudioVisualizer'), {
  ssr: false
})
const inter = Inter({ subsets: ['latin'] })
=======
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useColorModeValue } from '@chakra-ui/react'
>>>>>>> ed053125ffefb34eca28131e7d8135de06a3bfe3

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

// animation variants
const vinylVariants = {
  spinning: {
    rotate: 360,
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'linear'
    }
  },
  stopped: {
    transition: { duration: 0 }
  }
}
const armVariants = {
  playing: {
    transform: 'rotate(15deg)'
  },
  stopped: {
    transform: 'rotate(0deg)'
  }
}

export default function Home() {
  // vinyl playing state
  const [ playing, setPlaying ] = useState(false)

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
        <NavBar/>
        <Box
          height="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          <Container pos="relative" width="445" height="300" onClick={() => setPlaying(s => !s)}>
            <motion.img
              src="/table.svg"
              width="445" height="300" alt="vinyl player"
            />
            <motion.img
              src="/vinyl.svg"
              width="250" height="250" alt="vinyl"
              style={{
                position: 'absolute',
                left: '40px',
                top: '30px'
              }}
              variants={vinylVariants}
              animate={playing ? "spinning" : "stopped" }
            />
            <motion.img src='/arm.svg' width="75" height="204" alt="player arm"
              style={{
                position: 'absolute',
                left: '280px',
                top: '50px',
                transformOrigin: 'center 25px'
              }}
              transition={{
                duration: 0.2,
              }}
              variants={armVariants}
              animate={playing ? "playing" : "stopped"}
            />
          </Container>
          <Container
            border='1px'
            borderBottomLeftRadius='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Text textAlign='center' fontSize='3xl' fontWeight='bold'>
              A Social Media Platform for The <Text as='span'
                fontSize='6xl'
                fontWeight='extrabold'
                bgGradient={useColorModeValue('linear(to-r, #F9A824, #87D8C8)','linear(to-r, #9B9B9B, #87D8C8)' )}
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


export async function getServerSideProps(context:any) {
  const session = await unstable_getServerSession(context.req, context.res);

  if (session) {
    return {
      redirect: { destination: "/personal" },
    };
  }

  return {
    props: {
      session
    },
  };
}