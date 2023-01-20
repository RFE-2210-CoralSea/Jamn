import { Grid, Text, Image, IconButton, Flex } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { useColorModeValue } from '@chakra-ui/react'
import { CommentSection } from './CommentSection'
import { WrapperFunc } from './Wavesurfer'

export default function AudioVisualizer ({ posts, bands }:any) {
  console.log(posts)
  const songName = useRef()
  const playButton = useRef()
  const duration2 = useRef()
  const current = useRef()
  const bandName = useRef()
  const songData = useRef()
  songData.current= posts.audio.data
  songName.current = posts.text
  playButton.current = posts.id
  duration2.current = 'duration' + posts.id
  current.current = posts.date

  if (bands?.length > 1) {
    for (const band of bands) {
      if (posts.bandId === band.id) {
        bandName.current = band.name
      }
    }
  } else if (bands) {
    bandName.current = bands[0].name
  }

  useEffect(() => {
    if (posts.id) {
      setTimeout(() => {
        WrapperFunc(songName, playButton, duration2, current, songData)
      }, 500)
    } else {
      return
    }
  },[])

  return (
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
            {songName.current} - <span>{bandName.current}</span>

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

          <div id={'a'+ songName.current.replace(/[^0-9a-z]/gi, '')}/>
        </Grid>

        <CommentSection comments={posts.comments} postId={posts.id} bandId={posts.bandId}/>

      </Grid>
  )
}
