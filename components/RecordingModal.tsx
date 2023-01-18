import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { IconButton, Button, ButtonGroup, Tooltip } from '@chakra-ui/react'
import { AiOutlineCustomerService, AiOutlinePlayCircle } from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const RecordingModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ recording, setRecording ] = useState(false)
  const [ recorder, setRecorder ] = useState<MediaRecorder | null>(null)
  const [ url, setUrl ] = useState('')

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setRecorder(new MediaRecorder(stream))
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (recorder) {
      recorder.ondataavailable = (event) => {
        console.log('test')
        setUrl(URL.createObjectURL(event.data))
      }
    }
  }, [recorder])

  // begin recording
  const record = async () => {
    if (!recorder) return
    if (recording) {
      console.log('stop', url)
      recorder.stop()
      const audio = new Audio(url)
      audio.play()
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
              <IconButton aria-label='start recording' icon={<AiOutlinePlayCircle width='20vw'/>} onClick={record}/>
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