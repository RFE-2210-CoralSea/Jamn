import { Flex, Stack, Heading } from '@chakra-ui/react'
import { DarkMode } from './DarkMode'
import { Login } from './Login'
import SignOut from './SignOut'
import { BandModal } from './BandModal'
import { RecordingModal } from './RecordingModal'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export const NavBar = () => {
  const { data: session, status } = useSession()

  // user is not logged in
  if (status === 'unauthenticated' || !session) {
    return (
      <Flex w='100vw' justifyContent='space-between' p={2}>
        <Heading><Link href="/">Musi 🎸</Link></Heading>
        <Stack direction='row'>
            <Login/>
            <DarkMode/>
        </Stack>
      </Flex>
    )
  }

  return (
    <Flex w='100vw' justifyContent='space-between' p={2}>
      <Heading><Link href="/">Musi 🎸</Link></Heading>
      <Stack direction='row'>
          <BandModal/>
          <RecordingModal/>
          <SignOut/>
          <DarkMode/>
      </Stack>
    </Flex>
  )
}