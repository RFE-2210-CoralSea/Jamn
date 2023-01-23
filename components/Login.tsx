import { IconButton, Tooltip } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { AiOutlineUser } from 'react-icons/ai'

export const Login = () => {
  return (
    <>
      <Tooltip hasArrow label="Login with Google">
        <IconButton
          aria-label="login"
          onClick={() => signIn('google')}
          bg="teal.500"
          icon={<AiOutlineUser />}
        />
      </Tooltip>
    </>
  )
}
