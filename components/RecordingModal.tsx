import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack, Select } from '@chakra-ui/react'
import { IconButton, Button, ButtonGroup, Tooltip, FormControl, Input } from '@chakra-ui/react'
import { AiOutlineCustomerService, AiOutlinePlayCircle } from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'

// helper function to convert a file to an array buffer
function readFile(f: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    // Create file reader
    let reader = new FileReader()

    // Register event listeners
    reader.addEventListener('loadend', (e) => resolve(e?.target?.result as ArrayBuffer))
    reader.addEventListener('error', reject)

    // Read file
    reader.readAsArrayBuffer(f)
  })
}

export const RecordingModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ recording, setRecording ] = useState(false)
  const [ recorder, setRecorder ] = useState<MediaRecorder | null>(null)
  // may also need to store the blob itself?
  const [ url, setUrl ] = useState('')
  const [ audio, setAudio ] = useState<Blob>()

  // input refs
  const songName = useRef<HTMLInputElement>(null)
  const band = useRef<HTMLSelectElement>(null)
  const songKey = useRef<HTMLInputElement>(null)
  const file = useRef<HTMLInputElement>(null)

  // setup audio recorder
  useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          setRecorder(new MediaRecorder(stream))
        })
        .catch(console.error)
    }
  }, [isOpen])

  // begin recording
  const record = async () => {
    if (!recorder) return

    // add event listener to recorder
    if (!recorder.ondataavailable) {
      recorder.ondataavailable = (event) => {
        setAudio(event.data)
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
  const submit = async () => {
    // ensure fields are filled out
    if (
      file.current?.files &&
      band.current &&
      songName.current &&
      audio
    ) {

      // array buffer has to be converted to a regular buffer for some reason
      await fetch('/api/newPost', {
        method: 'POST',
        body: JSON.stringify({
          pdf: Buffer.from(await readFile(file?.current?.files[0] as File)),
          audio: Buffer.from(await readFile(audio as File)),
          bandName: band.current.value as string,
          songName: songName?.current?.value as string
        })
      })
    } else {
      console.log('test')
    }
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
            <Stack direction='column' spacing='5'>
              <FormControl>
                <Input placeholder='Song Name' ref={songName}></Input>
              </FormControl>
              <Select placeholder='Select Band' ref={band}>
                {/* This will be dynamically loaded */}
                <option value='band1_id'>Example Band</option>
                <option value='band2_id'>Another Example Band</option>
              </Select>
              <FormControl>
                <Input placeholder='Key' ref={songKey}></Input>
              </FormControl>
              {url && <audio src={url} controls></audio>}
              <FormControl>
                <Input type='file' accept='application/pdf' ref={file}></Input>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Tooltip hasArrow label='Start Recording!'>
                <IconButton aria-label='start recording' icon={<AiOutlinePlayCircle/>} onClick={record}/>
              </Tooltip>
              <Button onClick={submit}>Upload</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}