import { Box, Center, SimpleGrid, Spinner, VStack } from '@chakra-ui/react'
import { NavBar, PersonalDescription, ProfileImage, UserPost, UserStats } from 'components'
import { unstable_getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import useSWR from 'swr'

const LazyVisualizer = dynamic(() => import('components/AudioVisualizer'), {
  ssr: false
})

const fetcher = (...args: any) => fetch(...args).then((res) => res.json())

const personal = () => {
  const { data, error, isLoading } = useSWR('/api/userFeed', fetcher, {
    refreshInterval: 1000
  })

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <>
      <Head>
        <title>Your Homepage</title>
      </Head>

      <Box h="100vh" w="100vw" maxW="100%">
        <NavBar />
        <SimpleGrid columns={2} alignContent="center">
          <VStack w="100%">
            <ProfileImage image={data.picture} username={data.name} />
            <UserStats stat={data.posts.length} />
            <PersonalDescription
              description={data.bio}
              instruments={data.instruments}
              roles={data.roles}
            />
          </VStack>

          <VStack mb="5rem" mr="30rem" spacing="2rem">
            <UserPost bands={data.roles} />
            {data.posts.map((post) => {
              return <LazyVisualizer key={post.id} posts={post} bands={data.roles} />
            })}
          </VStack>
        </SimpleGrid>
      </Box>
    </>
  )
}

export default personal

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(context.req, context.res)

  if (!session) {
    return {
      redirect: { destination: '/' }
    }
  }
  console.log('This is a session' + session)
  return {
    props: {
      session
    }
  }
}
