import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { IconButton, Button, ButtonGroup, Tooltip } from '@chakra-ui/react'
import { AiOutlineCustomerService, AiOutlinePlayCircle } from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const RecordingModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ recording, setRecording ] = useState(false)
  const [ recorder, setRecorder ] = useState<MediaRecorder | null>(null)
  // may also need to store the blob itself?
  const [ url, setUrl ] = useState('')

  // setup audio recorder
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setRecorder(new MediaRecorder(stream))
      })
      .catch(console.error)
  }, [])

  // begin recording
  const record = async () => {
    if (!recorder) return

    // add event listener to recorder
    if (!recorder.ondataavailable) {
      recorder.ondataavailable = (event) => {
        setUrl(URL.createObjectURL(event.data))
      }
    }

    if (recording) {
      recorder.stop()
      setRecording(false)
    } else {
      setRecording(true)
      recorder.start()
    }
  }

  // submit audio to db
  const submit = () => {
    console.log('store audio in db')
  }

  return (
    <>
    <Tooltip hasArrow label='Record a song!'>
      <IconButton aria-label='create band' bg='orange.400' icon={<AiOutlineCustomerService/>} onClick={onOpen}/>
    </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Record A Song! </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <IconButton aria-label='start recording' icon={<AiOutlinePlayCircle/>} onClick={record}/>
              {url && <audio src={url} controls></audio>}
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button onClick={submit}>Upload</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}