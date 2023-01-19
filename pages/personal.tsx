import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NavBar } from '../components/NavBar'
import { ProfileImage } from '../components/ProfileImage'
import { PersonalDescription } from '../components/PersonalDescription'
import { Box, Heading, SimpleGrid, VStack, useColorModeValue} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const LazyVisualizer = dynamic(() => import('../components/AudioVisualizer'), {
  ssr: false
})

import { unstable_getServerSession } from "next-auth";
const personal = () => {

  useEffect(() => {
    fetch('api/userFeed')
      .then(async (response) => {
        const newData = await response.json()
        setData(newData)
      })
  },[])

  const [data, setData] = useState({
    "name": "Kong",
    "bio": "hello world",
    "instruments": [
        "Cello",
        "Piano",
        "Drums"
    ],
    "picture": "testprofilepicture.jpg",
    "posts": [
        {
            "name": "Joe",
            "band": "Super Sick Band",
            "audio": "testaudio.wav",
            "pdf": "testpdf.pdf",
            "date": "01/17/2023 @ 8:09pm",
            "text": "Hello user feed",
            "comments": [
                {
                    "name": "Darrien",
                    "profile_picture": "sampleprofpic.jpg",
                    "text": "hello comments",
                    "date": "01/17/2023 @ 8:10pm"
                },
                {
                    "name": 'Joe',
                    "profile_picture": 'pfp.jpeg',
                    "text": "test",
                    "date": '01/17/2023 @ 8:11pm'
                }
            ]
        }
    ],
    "roles": [
      "test"
    ]
})

  return(
    <>
    <Head>
      <title>Your Homepage</title>
    </Head>

      <Box h='100vh' maxH='100%' w='100vw' maxW='100%' bg={useColorModeValue('gray.200', 'dark')}>
        <NavBar/>
        <Box display='flex'>
            <SimpleGrid columns={2} spacing={5} alignContent='center'>
              <VStack>
                <ProfileImage
                  image={data.picture}
                  name={data.name}/>
                <PersonalDescription
                  description={data.bio}
                  instruments={data.instruments}
                  bands={data.roles}/>
              </VStack>

              <VStack mb='5rem'>
                <Heading mt='9rem'></Heading>
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


export async function getServerSideProps(context:any) {
  const session = await unstable_getServerSession(context.req, context.res);

  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }
  console.log(session)
  return {
    props: {
      session
    },
  };
}