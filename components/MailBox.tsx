import { IconButton, Tooltip, Text, Box } from '@chakra-ui/react'
import { AiOutlineMail } from 'react-icons/ai'
import { signIn } from 'next-auth/react'

export const MailBox = () => {
  return (
    <>
      <Tooltip hasArrow label='Check Invites'>
        <Box>
          <IconButton aria-label='login' onClick={() => signIn('google')} bg='teal.500' icon={<AiOutlineMail/>}/>
          <Text
          width="1.5rem"
          height="1.5rem"
          position="absolute"
          top="0.65rem"
          right="0.65rem"
          borderRadius="100%"
          background="red"
          textAlign="center"
          >1</Text>
        </Box>
      </Tooltip>
    </>
  )
}