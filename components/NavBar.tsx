import { Flex, Stack, Heading } from '@chakra-ui/react'
import { DarkMode } from './DarkMode'
import { Login } from './Login'
import { BandModal } from './BandModal'
import { RecordingModal } from './RecordingModal'
import { useSession } from 'next-auth/react'
import { HomeButton } from './HomeButton'
import Link from 'next/link'
import SignOut from './SignOut'
import { MailBox } from './MailBox'

export const NavBar = () => {
  const { data: session, status } = useSession()

  // user is not logged in
  if (status === 'unauthenticated' || !session) {
    return (
      <Flex w='100vw' justifyContent='space-between' p={5}>
        <Heading><Link href="/">Musi 🎸</Link></Heading>
        <Stack direction='row'>
            <Login/>
            <DarkMode/>
        </Stack>
      </Flex>
    )
  }

  return (
    <Flex justifyContent='space-between' p={5}>
      <Heading><Link href="/">Musi 🎸</Link></Heading>
      <Stack direction='row'>
          <BandModal/>
          <RecordingModal/>
          <HomeButton/>
          <SignOut/>
          <DarkMode/>
          <MailBox/>
      </Stack>
    </Flex>
  )
}