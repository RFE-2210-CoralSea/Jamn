import { Grid, Text, Image, IconButton, Container, Flex } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { useColorModeValue } from '@chakra-ui/react'
import { CommentSection } from './CommentSection'
import { WrapperFunc } from './Wavesurfer'

export default function AudioVisualizer ({ posts }:any) {

  const posterName = useRef(posts)
  const playButton = useRef(posts)
  const duration2 = useRef(posts)
  const current = useRef(posts)
  posterName.current = posts.name
  playButton.current = posts.postId
  duration2.current = posts.audio
  current.current = posts.text

  useEffect(() => {
    console.log(posterName.current, playButton.current, duration2.current, current.current)
    setTimeout(() => {
      WrapperFunc(posterName, playButton, duration2, current)
    }, 500)
  },[])

  return (
    <Container
      display='center'
      >

      <Grid
        gridTemplateColumns='10rem 1fr'
        width='40rem'
        borderRadius='0.5rem'
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow='dark-lg'>

        <Image
          src={posts.image}
          alt=''
          boxSize='10rem'
          objectFit='cover'
          borderRadius='0.5rem'/>

        <Grid
          gridTemplateColumns='1fr 4rem'
          p='1rem'>

          <Text
            fontSize='1.5rem'
            fontWeight='bold'>
            {posterName.current} - <span>{posts.band}</span>

            <Flex
              fontSize='0.8rem'>
              <span id={current.current}>0:00 /<span id={duration2.current}>0:00</span></span>
            </Flex>
          </Text>

          <IconButton
            aria-label='playButton'
            id={playButton.current}
            className='fi-rr-play'
            icon={<AiOutlineRight/>}
            w='3.5rem' h='3.5rem'
            borderRadius='50%'/>

          <div id={posterName.current}/>
        </Grid>

        <CommentSection comments={posts.comments}/>

      </Grid>

    </Container>
  )
}
