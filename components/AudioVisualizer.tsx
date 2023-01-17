import { Grid, Text, Image, IconButton, Container, Flex } from '@chakra-ui/react'
import { CommentSection } from './CommentSection'
import { useEffect } from 'react'
import { AiOutlineRight } from 'react-icons/ai'

export default function AudioVisualizer () {

  useEffect(() => {
    require('./Wavesurfer')
  },[])

  return (
    <Container display='center' mt='9rem'>
      <Grid gridTemplateColumns='10rem 1fr' width='40rem' borderRadius='0.5rem' bg='black'>
        <Image src='/slide.jpg' alt='' boxSize='10rem' objectFit='cover' borderRadius='0.5rem'/>

        <Grid gridTemplateColumns='1fr 4rem' p='1rem'>
          <Text fontSize='1.5rem' fontWeight='bold' color='white'>
            Slide - Frank Ocean
            <Flex fontSize='0.8rem'>
              <span id='current'>0:00 /<span id='duration'>0:00</span></span>
            </Flex>
          </Text>
          <IconButton aria-label='playButton' id='playPause' className='fi-rr-play' icon={<AiOutlineRight/>} w='3.5rem' h='3.5rem' borderRadius='50%'/>
          <div id='waveform'/>
        </Grid>
      </Grid>
    </Container>
  )
}
