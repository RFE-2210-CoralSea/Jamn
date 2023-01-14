import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { IconButton, ButtonGroup, Stack, Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

export const BandModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton aria-label='create band' bg='pink.300' icon={<AiOutlineUsergroupAdd/>} onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new band!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction='column' spacing='5'>
              <Editable defaultValue='Band Name' bg='black' borderRadius='5'>
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
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}