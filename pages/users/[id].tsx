import { Box, Center, SimpleGrid, Spinner, VStack } from '@chakra-ui/react'
import Head from 'next/head'

import { NavBar } from 'components'
import prisma from '../../lib/Prisma'

interface FeedProps {
  user: {
    bio: string,
    email: string,
    id: number,
    name: string,
    picture: string,
  }
}

export default function UserFeed({ user }: FeedProps) {
  console.log(user)
  return (
    <>
      <Head>
        <title>Username</title>
      </Head>
      <Box h="100vh" w="100vw" maxW="100%">
        <NavBar />
      </Box>
    </>
  )
}

export async function getServerSideProps({ params }: any) {
  const user = await prisma.users.findFirst({
    where: {
      id: parseInt(params.id as string)
    }
  })

  if (!user) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      user
    }
  }
}