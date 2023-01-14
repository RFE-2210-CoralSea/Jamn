import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Editable, EditablePreview, EditableInput, Stack, IconButton } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge } from '@chakra-ui/react'

export const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Avatar as='button' onClick={onOpen}>
        <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em' />
      </Avatar>

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

              <IconButton aria-label='otherlogins' placeholder='Other Logins' icon={(
              <> Other Logins
              <EmailIcon ml="2"/> </>)}/>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}