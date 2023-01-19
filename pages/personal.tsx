import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NavBar } from '../components/NavBar'
import { UserPost } from '../components/UserPost'
import { ProfileImage } from '../components/ProfileImage'
import { PersonalDescription } from '../components/PersonalDescription'
import { Box, SimpleGrid, VStack, useColorModeValue, Center, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { unstable_getServerSession } from 'next-auth'
import { UserStats } from '../components/UserStats'
import useSWR from 'swr'


const LazyVisualizer = dynamic(() => import('../components/AudioVisualizer'), {
  ssr: false
})

const fetcher = (...args:any) => fetch(...args).then(res => res.json())

const personal = () => {
  const { data, error, isLoading } = useSWR('/api/userFeed', fetcher, { refreshInterval: 1000 })

  if (isLoading) {
    return (
      <Center h='100vh'>
        <Spinner size='xl'/>
      </Center>
    )
  }

  return (
    <>
    <Head>
      <title>Your Homepage</title>
    </Head>

      <Box h='100vh' maxH='100%' w='100vw' maxW='100%' bg={useColorModeValue('gray.300', 'dark')}>
        <NavBar/>
            <SimpleGrid columns={2} alignContent='center'>
              <VStack pos='relative'>
                <ProfileImage
                  image={data.picture}
                  username={data.name}/>
                <UserStats stat={data.posts.length}/>
                <PersonalDescription
                  description={data.bio}
                  instruments={data.instruments}
                  roles={data.roles}/>
              </VStack>

              <VStack mb='5rem' mr='40rem'>
                <UserPost bands={data.roles}/>
                {data.posts.map((post) => {
                  return <LazyVisualizer posts={post}/>
                })}
              </VStack>
          </SimpleGrid>
      </Box>
    </>
  )
}


export default personal

export async function getServerSideProps (context:any) {
  const session = await unstable_getServerSession(context.req, context.res);

  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }
  console.log('This is a session'+ session)
  return {
    props: {
      session
    },
  }
}