import { Flex, Stack, Heading } from '@chakra-ui/react'
import { DarkMode } from './DarkMode'
import { Login } from './Login'
import { BandModal } from './BandModal'
import { RecordingModal } from './RecordingModal'
import { HomeButton } from './HomeButton'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import SignOut from './SignOut'
import { MailBox } from './MailBox'
import { useRouter } from 'next/router'

export const NavBar = ({id}) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  console.log('router', router.pathname)

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
          <HomeButton/>
          <BandModal/>
          <RecordingModal/>
          <SignOut/>
          <DarkMode/>
          {router.pathname === '/personal' && <MailBox/>}
      </Stack>
    </Flex>
  )
}