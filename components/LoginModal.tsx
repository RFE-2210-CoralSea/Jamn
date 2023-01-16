import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Editable, EditablePreview, EditableInput, Stack, IconButton, ButtonGroup, Input, FormControl, FormLabel } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { useRef } from 'react'

export const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // useState or useRef?
  const user = useRef<HTMLInputElement>(null)
  const pass = useRef<HTMLInputElement>(null)

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
    }
  }

  return (
    <>
      <IconButton aria-label='login' onClick={onOpen} bg='teal' icon={<AiOutlineUser/>}/>

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
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input ref={pass} type='password' placeholder='Password' bg='black' borderRadius='5'/>
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