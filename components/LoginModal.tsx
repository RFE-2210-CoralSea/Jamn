import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Editable, EditablePreview, EditableInput, Stack, IconButton, ButtonGroup, Input, FormControl, FormLabel } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { signIn } from 'next-auth/react'

export const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input placeholder='Username' bg='black' borderRadius='5'/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input placeholder='Password' bg='black' borderRadius='5'/>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button>Sign Up</Button>
              <Button onClick={() => signIn('google')}>Login with Google</Button>
              <Button >Login</Button>
            </ButtonGroup>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}