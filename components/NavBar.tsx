import { Box, Flex, Stack, Heading, Tooltip } from '@chakra-ui/react'
import { DarkMode } from './DarkMode'
import { LoginModal } from './LoginModal'
import { BandModal } from './BandModal'
import { RecordingModal } from './RecordingModal'
import { useSession } from 'next-auth/react'

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
            <DarkMode/>
        </Stack>
      </Flex>
  </Box>
  )
}