import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NavBar } from '../components/NavBar'
import { UserPost } from '../components/UserPost'
import { ProfileImage } from '../components/ProfileImage'
import { PersonalDescription } from '../components/PersonalDescription'
import { Box, Heading, SimpleGrid, VStack, useColorModeValue } from '@chakra-ui/react'
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
  id: 1,
  picture: 'https://lh3.googleusercontent.com/a/AEdFTp7zpHRw02VmRcAJtwEVojykk3ockYQRUts-CkvNrQ=s96-c',
  email: 'joelin3478@gmail.com',
  name: 'Joe Lin',
  bio: 'Aspiring musician',
  posts: [],
  instruments: [ { id: 1, userId: 1, instrument: 'All Of them' } ],
  roles: [ { name: 'DJ Degens', id: 1 } ]
})


  return(
    <>
    <Head>
      <title>Your Homepage</title>
    </Head>

      <Box h='100vh' maxH='100%' w='100vw' maxW='100%' bg={useColorModeValue('gray.200', 'dark')}>
        <NavBar/>
        <Box display='flex'>
            <SimpleGrid columns={2} spacing={5} mr='5rem' alignContent='center'>

              <VStack>
                <ProfileImage
                  image={data.picture}
                  name={data.name}/>
                <PersonalDescription
                  description={data.bio}
                  instruments={data.instruments}
                  roles={data.roles}/>
              </VStack>

              <VStack mb='5rem'>
                <UserPost/>
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