import Head from 'next/head'
import { Container, Box, Text, Flex } from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useColorModeValue } from '@chakra-ui/react'
import { unstable_getServerSession } from 'next-auth'

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
  const [ audio ] = useState(typeof Audio !== 'undefined' && new Audio('/slide frank ocean.mp4'))

  return (
    <>
      <Head>
        <title>Blue-Ocean</title>
      </Head>

      <Box
        height="100vh"
        background="center/cover"
        backgroundImage={useColorModeValue("/Honolulu-Day.gif", "/Honolulu-Night.gif")}
        backgroundRepeat="no-repeat"
        >
        <NavBar/>
        <Box textAlign='center'>
          <Text color='white' fontSize='3xl' fontWeight='bold'>
            A Social Media Platform for The
          </Text>
          <Text
              fontSize='6xl'
              fontWeight='extrabold'
              bgGradient={useColorModeValue('linear(to-r, #F9A824, #87D8C8)','linear(to-r, #9B9B9B, #87D8C8)' )}
              bgClip='text'>
                Sonically Inclined
            </Text>
        </Box>
          <Container pos="relative" left='600px' top='600px' onClick={() => {
            if (audio) {
              if (playing) {
                audio.pause()
              } else {
                audio.play()
              }
              setPlaying(s => !s)
            }
          }}>
            <motion.img
              src="/table.svg"
              width="0" height="0" alt="vinyl player"
            />
            <motion.img
              src="/vinyl.svg"
              width="150" height="150" alt="vinyl"
              style={{
                position: 'absolute',
                left: '130px',
                top: '130px',
              }}
              variants={vinylVariants}
              animate={playing ? "spinning" : "stopped" }
            />
            <motion.img src='/arm.svg' width="50" height="180" alt="player arm"
              style={{
                position: 'absolute',
                left: '280px',
                top: '100px',
                transformOrigin: 'center 25px'
              }}
              transition={{
                duration: 0.2,
              }}
              variants={armVariants}
              animate={playing ? "playing" : "stopped"}
            />
          </Container>
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