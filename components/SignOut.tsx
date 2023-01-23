import { IconButton, Tooltip } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AiOutlineUser } from 'react-icons/ai'

export default function SignOut() {
  const router = useRouter()

  const handleClick = () => {
    signOut({ redirect: false })
    router.push('/')
  }

  return (
    <>
      <Tooltip hasArrow label="Sign Out">
        <IconButton
          aria-label="login"
          onClick={handleClick}
          bg="teal.500"
          icon={<AiOutlineUser />}
        />
      </Tooltip>
    </>
  )
}
