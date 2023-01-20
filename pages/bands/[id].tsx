import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NavBar } from '../../components/NavBar'
import { ProfileImage } from '../../components/ProfileImage'
import { PersonalDescription } from '../../components/PersonalDescription'
import { Box, Card, SimpleGrid, VStack, useColorModeValue, CardHeader, CardBody, Heading, Text, Stack, List, ListItem, Spinner, Center } from '@chakra-ui/react'
import { BandPost } from '../../components/BandPost'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
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

  return (
    <>
      <Head>
        <title>Band Feed</title>
      </Head>
      <Box h='100vh' w='100vw' maxW='100%'>
        <NavBar/>
        <Box display='flex'>
          <SimpleGrid columns={2} spacing={5} alignContent='center'>
            <VStack>
              <ProfileImage
                image={data.image}
                name={data.name}/>
              <Box display='center' maxW='15rem'>
                <Card boxShadow='dark-lg' bg={useColorModeValue('teal.100', 'teal.600')} rounded={10}>
                  <CardHeader>
                    <Heading borderBottom='1px solid black' alignSelf='center'>Description</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text mt='-1rem' fontSize='xl'>{data.description}</Text>
                  </CardBody>
                  <CardHeader>
                    <Heading borderBottom='1px solid black' alignSelf='center'>Members</Heading>
                  </CardHeader>
                  <CardBody mt='-1rem'>
                    <Stack spacing='3rem'>
                      <List fontSize="xl" textAlign="center">
                        {data.roles.map((member: any) => <ListItem>{member.name}</ListItem>)}
                      </List>
                    </Stack>
                  </CardBody>
                </Card>
              </Box>
            </VStack>
            <VStack>
              <BandPost bandName={data.name}/>
                {data.posts.map((post: any) => {
                  return <LazyVisualizer posts={post} key={post.name}/>
                })}
            </VStack>
          </SimpleGrid>
        </Box>
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

  return {
    props: {
      session
    }
  }
}