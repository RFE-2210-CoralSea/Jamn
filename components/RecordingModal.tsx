import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { IconButton, Button, ButtonGroup, Tooltip } from '@chakra-ui/react'
import { AiOutlineCustomerService } from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react'

export const RecordingModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Tooltip hasArrow label='Record a song!'><IconButton aria-label='create band' bg='orange.400' icon={<AiOutlineCustomerService/>} onClick={onOpen}/></Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Record A Song! </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              placeholder for recording
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button>Upload</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}