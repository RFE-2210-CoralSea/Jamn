import { IconButton, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiTwotoneHome } from 'react-icons/ai'

export const HomeButton = () => {
  const router = useRouter()

  const clickHandler = () => {
    router.push('/personal')
  }

  return (
    <Tooltip hasArrow label="Your Homepage">
      <IconButton
        aria-label="create band"
        bg="blue.400"
        icon={<AiTwotoneHome />}
        onClick={clickHandler}
      />
    </Tooltip>
  )
}
