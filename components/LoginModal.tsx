import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Stack, IconButton, ButtonGroup, Input, FormControl, FormLabel, FormErrorMessage, Tooltip } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'

export const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // useState or useRef?
  const user = useRef<HTMLInputElement>(null)
  const pass = useRef<HTMLInputElement>(null)

  // state for invalid credentials error message
  const [ invalid, setInvalid ] = useState(false)

  // login handler for custom credentials
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!user.current || !pass.current) return

    const result = await signIn('credentials', {
      redirect: false,
      username: user.current.value,
      password: pass.current.value,
    })

    console.log('login result:', result)

    // check if login was successful
    if (result && !result.error && result.ok) {
      // do something on success
    } else {
      // do something for invalid credentials
      setInvalid(true)
    }
  }

  return (
    <>
    <Tooltip hasArrow label='User Login'>
      <IconButton aria-label='login' onClick={onOpen} bg='teal.500' icon={<AiOutlineUser/>}/>
    </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Your Account</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack direction='column' spacing='5'>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input ref={user} placeholder='Username' bg='black' borderRadius='5'/>
              </FormControl>
              <FormControl isInvalid={invalid}>
                <FormLabel>Password</FormLabel>
                <Input ref={pass} type='password' placeholder='Password' bg='black' borderRadius='5'/>
                <FormErrorMessage>Invalid Credentials</FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button>Sign Up</Button>
              <Button onClick={() => signIn('google')}>Login with Google</Button>
              <Button onClick={handleLogin}>Login</Button>
            </ButtonGroup>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}