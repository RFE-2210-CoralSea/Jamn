import dynamic from 'next/dynamic'
import Head from 'next/head'
import ProfileImage from '../components/ProfileImage'
import { NavBar } from '../components/NavBar'
import { PersonalDescription } from '../components/PersonalDescription'
import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { CommentSection } from '../components/CommentSection'

const LazyVisualizer = dynamic(() => import('../components/AudioVisualizer'), {
  ssr: false
})

const personal = () => {
  interface Data {
    imgURL: string,
    name: string,
    instruments: string[],
  }

  const [data, setData] = useState({
    imgURL: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
    name: 'Tracy Hillberg',
    instruments: ['cello', 'flute', 'drums'],
  })


  return(
    <>
    <Head>
      <title>Your Homepage</title>
    </Head>

      <Box h='100vh' w='100vw'>
        <NavBar/>
        <Box display='flex'>
            <SimpleGrid columns={2} spacing={5} alignContent='center'>
              <VStack>
                <ProfileImage imgURL={data.imgURL} name={data.name}/>
                <PersonalDescription instruments={data.instruments} sectionName='personal'/>
              </VStack>
              <VStack>
                <LazyVisualizer/>
                <CommentSection/>
              </VStack>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  )
}

export default personal;