import { Box, Container, Text, useColorModeValue } from '@chakra-ui/react'
import { NavBar } from 'components'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useState } from 'react'

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
  const [playing, setPlaying] = useState(false)
  const [audio] = useState(typeof Audio !== 'undefined' && new Audio('/slide frank ocean.mp4'))

  return (
    <>
      <Head>
        <title>Blue-Ocean</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Box
        height="100vh"
        backgroundSize="cover"
        backgroundImage={useColorModeValue('/Honolulu-Day.gif', '/Honolulu-Night.gif')}
        backgroundRepeat="no-repeat"
        bgPosition="center"
        position="relative"
      >
        <NavBar color={'white'}/>
        <Box textAlign="center" mt={200}>
          <Text color="white" fontSize="3xl" fontWeight="bold">
            A Social Media Platform for The
          </Text>
          <Text
            fontSize="6xl"
            fontWeight="extrabold"
            bgGradient={useColorModeValue(
              'linear(to-r, #F9A824, #87D8C8)',
              'linear(to-r, #9B9B9B, #87D8C8)'
            )}
            bgClip="text"
          >
            Sonically Inclined
          </Text>
        </Box>
        <Container
          pos="relative"
          left="600px"
          top="430px"
          onClick={() => {
            if (audio) {
              if (playing) {
                audio.pause()
              } else {
                audio.play()
              }
              setPlaying((s) => !s)
            }
          }}
        >
          <motion.img
            src="/vinyl.svg"
            width="150"
            height="150"
            alt="vinyl"
            style={{
              position: 'absolute',
              left: '130px',
              top: '100px'
            }}
            variants={vinylVariants}
            animate={playing ? 'spinning' : 'stopped'}
          />
          <motion.img
            src="/arm.svg"
            width="50"
            height="180"
            alt="player arm"
            style={{
              position: 'absolute',
              left: '280px',
              top: '80px',
              transformOrigin: 'center 25px'
            }}
            transition={{
              duration: 0.2
            }}
            variants={armVariants}
            animate={playing ? 'playing' : 'stopped'}
          />
        </Container>
      </Box>
    </>
  )
}
