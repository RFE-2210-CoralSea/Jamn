import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { IconButton, Button, ButtonGroup, Stack, Editable, EditableInput, EditablePreview, Tooltip } from '@chakra-ui/react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'

export const BandModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Tooltip hasArrow label='Band Login'><IconButton aria-label='create band' bg='pink.300' icon={<AiOutlineUsergroupAdd/>} onClick={onOpen}/></Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new band!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction='column' spacing='5'>
              <Editable defaultValue='Band Name' bg={useColorModeValue('gray.200', 'black')} borderRadius='5'>
                <EditablePreview/>
                <EditableInput/>
              </Editable>

              <Editable defaultValue='Password' bg={useColorModeValue('gray.200', 'black')} borderRadius='5'>
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