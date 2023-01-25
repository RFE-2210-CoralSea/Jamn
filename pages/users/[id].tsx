import {
  Box,
  Center,
  VStack,
  Avatar,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useColorModeValue,
  List,
  TagLabel,
  Tag,
  Flex,
  ListItem
} from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { NavBar } from 'components'
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
  return (
    <>
      <Head>
        <title>{user.name}&apos;s Page</title>
      </Head>
      <Box h="100vh" w="100vw" maxW="100%">
        <NavBar />
        <Center>
          <VStack w="100%">
            <Avatar
              src={user.picture}
              boxShadow="dark-lg"
              border="1px solid black"
              objectFit="cover"
              boxSize="15rem"
              mt="10rem"
            />

            <Text textAlign="center" fontSize="3xl" fontWeight="bold">
              {user.name}
            </Text>

            <Box w="16rem">
              <Tabs variant="soft-rounded" colorScheme={useColorModeValue('blue', 'green')}>
                <TabList>
                  <Tab>Bio</Tab>
                  <Tab>Bands</Tab>
                  <Tab>Instruments</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Text fontSize="xl" fontWeight="bold">{user.bio}</Text>
                  </TabPanel>
                  <TabPanel>
                    <Center>
                      <List fontSize="lg" fontWeight="bold">
                        {user.roles.map((role) => {
                          return (
                            <Flex key={role.id} justifyContent="space-between" mb="1rem">
                              <Tag
                                size="xl"
                                colorScheme={useColorModeValue('blue', 'green')}
                                borderRadius="full"
                              >
                                <Avatar size="sm" mr={2} />
                                <TagLabel fontWeight="bold" mr={3} key={role.name}>
                                  <Link href={`/bands/${role.id}`}>{role.name}</Link>
                                </TagLabel>
                              </Tag>
                            </Flex>
                          )
                        })}
                      </List>
                    </Center>
                  </TabPanel>
                  <TabPanel>
                    <List fontSize="lg" textAlign="center" fontWeight="bold">
                      {user.instruments.map((instrument) => {
                        return <ListItem key={instrument.id}>• {instrument.instrument}</ListItem>
                      })}
                    </List>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </VStack>
        </Center>
      </Box>
    </>
  )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  // query DB for user
  const user = await prisma.users.findFirst({
    where: {
      id: parseInt(params?.id as string)
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

  // query for a user's bands
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