import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NavBar } from '../../components/NavBar'
import { ProfileImage } from '../../components/ProfileImage'
import { BandDescription } from '../../components/BandDescription'
import { Box, Card, SimpleGrid, VStack, useColorModeValue, CardHeader, CardBody, Heading, Text, Stack, List, ListItem, Spinner, Center } from '@chakra-ui/react'
import { BandPost } from '../../components/BandPost'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { UserStats } from '../../components/UserStats'
import prisma from '../../lib/Prisma';
import useSWR from 'swr'

const LazyVisualizer = dynamic(() => import('../../components/AudioVisualizer'), {
  ssr: false
})

const check = async (pid:string) => {
  let search = await prisma.bands.findFirst({
    where: {
      id: Number(pid)
    }
  })
  return search
}

const fetcher = (...args:any) => fetch(...args).then(res => res.json())

export default function BandFeed(props: any) {
  const router = useRouter()
  const { data, error, isLoading } = useSWR(`/api/bandFeed/${router.query.id}`, fetcher, { refreshInterval: 1000 })

  if (isLoading) {
    return (
      <Center h='100vh'>
        <Spinner size='xl'/>
      </Center>
    )
  }

  if (!data.roles) return <></>
  console.log(data)
  return (
    <>
      <Head>
        <title>Band Feed</title>
      </Head>
      <Box h='100vh' w='100vw' maxW='100%'>
        <NavBar/>
          <SimpleGrid columns={2} spacing={5} alignContent='center'>
            <VStack>
              <ProfileImage
                image={data.image}
                username={data.name}/>
              <UserStats stat={data.posts.length}/>
              <BandDescription
                description={data.description}
                members={data.roles}
                bandId={data.id}
              />
            </VStack>
            <VStack mb='5rem' mr='30rem' spacing='2rem'>
              <BandPost bandName={data.name}/>
                {data.posts.map((post: any) => {
                  return <LazyVisualizer posts={post} key={post.name}/>
                })}
            </VStack>
          </SimpleGrid>
      </Box>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  // TODO: test if user is a part of the given band
  // for now, just redirects if no session exists
  if (!session) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }

  const checkExists = await check(context.params.id);
    if (!checkExists) {
      return {
        notFound: true
      }
    }
  console.log(`This is a band page session` + session)
  return {
    props: {
      session
    }
  }
}