import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  VisuallyHidden
} from '@chakra-ui/react'
import { Button, ButtonGroup, FormControl, IconButton, Input, Tooltip } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineCustomerService, AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai'
import useSWR from 'swr'

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

// fetch bands a user is in
const fetcher = (...args: string[]) => fetch(...args).then((res) => res.json())

export const RecordingModal = () => {
  const { data, error, isLoading } = useSWR('/api/userFeed', fetcher)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [recording, setRecording] = useState(false)
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  // may also need to store the blob itself?
  const [url, setUrl] = useState('')
  const [audio, setAudio] = useState<Blob>()

  // input refs
  const songName = useRef<HTMLInputElement>(null)
  const band = useRef<HTMLSelectElement>(null)
  const songKey = useRef<HTMLInputElement>(null)

  // setup audio recorder
  useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setRecorder(new MediaRecorder(stream))
        })
        .catch(console.error)
    }
  }, [isOpen])

  // useEffect(() => console.log('modal',data), [data])

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
    if (band.current && songName.current && audio) {
      // array buffer has to be converted to a regular buffer for some reason
      await fetch('/api/newPost', {
        method: 'POST',
        body: JSON.stringify({
          audio: Buffer.from(await readFile(audio as File)),
          bandName: band.current.value as string,
          songName: songName?.current?.value as string
        })
      })
      // close modal
      document.getElementById('close-recording')?.click()
    }
  }

  return (
    <>
      <Tooltip hasArrow label="Record a song!">
        <IconButton
          aria-label="create band"
          bg="orange.400"
          icon={<AiOutlineCustomerService />}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Record A Song! </ModalHeader>
          <ModalCloseButton id="close-recording" />
          <ModalBody>
            <Stack direction="column" spacing="5">
              <FormControl>
                <Input placeholder="Song Name" ref={songName}></Input>
              </FormControl>
              <Select placeholder="Select Band" ref={band}>
                {!isLoading &&
                  data.roles?.map((band: any) => <option key={band.name} value={band.name}>{band.name}</option>)}
              </Select>
              <FormControl>
                <Input placeholder="Key" ref={songKey}></Input>
              </FormControl>
              {url && <audio src={url} controls></audio>}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Tooltip hasArrow label={recording ? 'Stop Recording!' : 'Start Recording!'}>
                <IconButton
                  aria-label="start recording"
                  icon={recording ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
                  onClick={record}
                />
              </Tooltip>
              <VisuallyHidden>
                <FormControl>
                  <Input id="upload-pdf" type="file" accept="application/pdf"></Input>
                </FormControl>
              </VisuallyHidden>
              <Button onClick={() => document.getElementById('upload-pdf')?.click()}>
                Upload PDF
              </Button>
              <Button onClick={submit}>Post Song</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
