import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Editable, EditablePreview, EditableInput, Stack, IconButton, ButtonGroup } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import Link from 'next/link'

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
              <Editable defaultValue='Username' bg='black' borderRadius='5'>
                <EditablePreview/>
                <EditableInput/>
              </Editable>

              <Editable defaultValue='Password' bg='black' borderRadius='5'>
                <EditablePreview/>
                <EditableInput/>
              </Editable>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button>Sign Up</Button>
              <Button><Link href='/api/auth/signin'> Other Logins </Link></Button>
              <Button >Login</Button>
            </ButtonGroup>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}