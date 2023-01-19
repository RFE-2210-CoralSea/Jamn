import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NavBar } from '../components/NavBar'
import { ProfileImage } from '../components/ProfileImage'
import { PersonalDescription } from '../components/PersonalDescription'
import { Box, Heading, SimpleGrid, VStack, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { BandModal } from '../components/BandModal'
import useSWR from 'swr'
import { unstable_getServerSession } from "next-auth";
import { Spinner } from '@chakra-ui/react'


const fetcher = (...args) => fetch(...args).then((res) => res.json())

const LazyVisualizer = dynamic(() => import('../components/AudioVisualizer'), {
  ssr: false
})

interface infoData {
  id: number,
  picture: string,
  email: string,
  name: string,
  bio: string,
  posts: [],
  instruments: [],
  roles: []

}
const personal = ({ info }) => {
  const { data, isLoading } = useSWR('http://localhost:3000/api/userFeed', fetcher, { refreshInterval: 1000, fallbackData: info })

  if (isLoading) {
    return (
    <div style={{display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </div>
    )
  }

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
                {data.posts?.map((post) => {
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


 return fetcher('http://localhost:3000/api/userFeed').then((info) => {
      return {
    props: {
      session,
      info
    },
  };
  })

}