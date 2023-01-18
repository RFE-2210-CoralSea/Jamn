import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NavBar } from '../components/NavBar'
import { ProfileImage } from '../components/ProfileImage'
import { PersonalDescription } from '../components/PersonalDescription'
import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { BandModal } from '../components/BandModal'

const LazyVisualizer = dynamic(() => import('../components/AudioVisualizer'), {
  ssr: false
})

const personal = () => {

  useEffect(() => {
    fetch('api/userFeed')
      .then(async (response) => {
        const newData = await response.json()
        setData(newData)
      })
  },[])

  const [data, setData] = useState({
  name: 'Jackson',
  description: 'hello world and welcome to my page',
  instruments: ['Cello', 'Piano', 'Drums'],
  bands: ['Super Sick Band', 'Awesome Band'],
  image: '/pfp.jpeg',
  posts: [
    {
      postId: 'a',
      name: 'Slide',
      band: 'Frank Ocean',
      image: '/slide.jpg',
      audio: '/slide frank ocean.mp4',
      pdf: 'testpdf.pdf',
      date: '01/17/2023 @ 8:09pm',
      text: 'Hello user feed',
      comments: [{
        name: 'Darrien',
        profile_picture: 'sampleprofpic.jpg',
        text: 'hello comments',
        date: '01/17/2023 @ 8:10pm'
      },
      {
        name: 'Joe',
        profile_picture: 'testpfp.jpg',
        text: "test",
        date: '01/17/2023 @ 8:11pm'
      }]
    },
    {
      postId: 'b',
      name: 'DieYoung',
      band: 'Sleepy Hallow',
      image: '/dieyoung.jpg',
      audio: '/die young.mp3',
      pdf: 'testpdf2.pdf',
      date: '01/17/2023 @ 10:23pm',
      text: 'test Text',
      comments: [{
        name: 'bro',
        profile_picture: 'broooo.jpg',
        text: 'BROOOOOOO',
        date: '01/17/2023 @ 10:30pm'
      }]
    }
  ]
})


  return(
    <>
    <Head>
      <title>Your Homepage</title>
    </Head>

      <Box h='100vh' w='100vw' maxW='100%'>
        <NavBar/>
        <Box display='flex'>
            <SimpleGrid columns={2} spacing={5} alignContent='center'>

              <VStack>
                <ProfileImage
                  image={data.image}
                  name={data.name}/>
                <PersonalDescription
                  description={data.description}
                  instruments={data.instruments}
                  bands={data.bands}/>
              </VStack>

              <VStack mb='5rem'>
                {data.posts.map((post) => {
                  return <LazyVisualizer posts={post}/>
                })}
              </VStack>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  )
}

export default personal;