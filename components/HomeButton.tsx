import { AiTwotoneHome } from 'react-icons/ai'
import { Tooltip, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const HomeButton = () => {
  const router = useRouter()

  const clickHandler = () => {
    router.push('/personal')
  }

  return (
    <Tooltip hasArrow label='Your Homepage'>
      <IconButton aria-label='create band' bg='blue' icon={<AiTwotoneHome/>} onClick={clickHandler}/>
    </Tooltip>
  )
}