import { Flex, Stack, Heading } from '@chakra-ui/react'
import { DarkMode } from './DarkMode'
import { Login } from './Login'
import SignOut from './SignOut'
import { BandModal } from './BandModal'
import { RecordingModal } from './RecordingModal'
import { useSession } from 'next-auth/react'
<<<<<<< HEAD

export const NavBar = (props:any) => {
    const { data: session, status } = useSession()
  return (
    <Box as='nav' w='100%' css={{ backDropFilter: 'blur(10px)' }}{...props}>
      <Flex justifyContent='space-between' p={2}>
        <Heading>Musi 🎸</Heading>
        <Stack direction='row'>
          {
            status !== 'authenticated' &&
            <LoginModal/>
          }
            <BandModal/>
            <RecordingModal/>
=======
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
>>>>>>> ed053125ffefb34eca28131e7d8135de06a3bfe3
            <DarkMode/>
        </Stack>
      </Flex>
    )
  }

  return (
    <Flex justifyContent='space-between'>
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