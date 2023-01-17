import { Flex, Stack, Heading } from '@chakra-ui/react'
import { DarkMode } from './DarkMode'
import { Login } from './Login'
import { BandModal } from './BandModal'
import { RecordingModal } from './RecordingModal'

export const NavBar = () => {
  return (
    <Flex w='100vw' justifyContent='space-between' p={2}>
      <Heading>Musi 🎸</Heading>
      <Stack direction='row'>
          <Login/>
          <BandModal/>
          <RecordingModal/>
          <DarkMode/>
      </Stack>
    </Flex>
  )
}