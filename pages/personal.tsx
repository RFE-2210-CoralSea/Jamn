import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NavBar } from '../components/NavBar'
import { UserPost } from '../components/UserPost'
import { ProfileImage } from '../components/ProfileImage'
import { PersonalDescription } from '../components/PersonalDescription'
import { Box, SimpleGrid, VStack, useColorModeValue, Center, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
<<<<<<< HEAD
import { BandModal } from '../components/BandModal'
import useSWR from 'swr'
import { unstable_getServerSession } from "next-auth";
import { Spinner } from '@chakra-ui/react'


const fetcher = (...args) => fetch(...args).then((res) => res.json())

=======
import { unstable_getServerSession } from 'next-auth'
import { UserStats } from '../components/UserStats'
>>>>>>> a5e784a2c62dcb7e719bacb1a9290479a3e62fff
const LazyVisualizer = dynamic(() => import('../components/AudioVisualizer'), {
  ssr: false
})

const personal = () => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    picture: '',
    name: '',
    bio: '',
    instruments: [],
    roles: [],
    posts: []
  })

  useEffect(() => {
    fetch('api/userFeed')
      .then(async (response) => {
        const newData = await response.json()
        setData(newData)
        setLoading(false)
      })
  },[])

  if (loading) {
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
                  name={data.name}/>
                <UserStats stat={data.posts.length}/>
                <PersonalDescription
                  description={data.bio}
                  instruments={data.instruments}
                  roles={data.roles}/>
              </VStack>

<<<<<<< HEAD
              <VStack mb='5rem'>
                <Heading mt='9rem'></Heading>
                {data.posts?.map((post) => {
=======
              <VStack mb='5rem' mr='40rem'>
                <UserPost/>
                {data.posts.map((post) => {
>>>>>>> a5e784a2c62dcb7e719bacb1a9290479a3e62fff
                  return <LazyVisualizer posts={post}/>
                })}
              </VStack>

          </SimpleGrid>
      </Box>
    </>
  )
}


export default personal

<<<<<<< HEAD
export async function getServerSideProps(context:any) {

=======
export async function getServerSideProps (context:any){
>>>>>>> a5e784a2c62dcb7e719bacb1a9290479a3e62fff
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