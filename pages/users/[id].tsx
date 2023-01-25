import { Box, Center, SimpleGrid, Spinner, VStack } from '@chakra-ui/react'
import Head from 'next/head'

import { NavBar, ProfileImage, PersonalDescription } from 'components'
import prisma from '../../lib/Prisma'

interface FeedProps {
  user: {
    bio: string,
    email: string,
    id: number,
    name: string,
    picture: string,
    instruments: {
      instrument: string,
      id: number,
      userId: number
    }[],
    roles: {
      name: string,
      id: number
    }[]
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
        <SimpleGrid columns={1} alignContent="center">
          <VStack w="100%">
            <ProfileImage image={user.picture} username={user.name} />
            <PersonalDescription
              description={user.bio}
              instruments={user.instruments}
              roles={user.roles}
            />
          </VStack>
        </SimpleGrid>
      </Box>
    </>
  )
}

export async function getServerSideProps({ params }: any) {
  const user = await prisma.users.findFirst({
    where: {
      id: parseInt(params.id as string)
    },
    include: {
      instruments: true,
      roles: true,
    }
  })

  if (!user) {
    return {
      notFound: true
    }
  }

  if (user.roles.length > 0) {
    for (let i = 0; i < user.roles.length; i++) {
      const bandNames = await prisma.bands.findUnique({
        where: {
          id: user.roles[i].bandId
        }
      })
      if (bandNames) {
        user.roles[i] = {
          ...user.roles[i],
          name: bandNames.name,
          id: bandNames.id
        }
      }
    }
  }

  return {
    props: {
      user
    }
  }
}