import { FormControl, CardHeader, Card, Stack, CardBody, VisuallyHiddenInput, Input, Button, Select, Tooltip, IconButton, ButtonGroup } from "@chakra-ui/react";
import { useState, useEffect, useRef } from 'react'
import { AiOutlinePlayCircle } from "react-icons/ai";

declare interface PostProps {
  bands: [{
    id: number,
    name: string
  }]
}

function readFile(f: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.addEventListener('loadend', (e) => {
      console.log(e?.target?.result)
      resolve(e?.target?.result as ArrayBuffer)})
    reader.addEventListener('error', reject)
    reader.readAsArrayBuffer(f)
  })
}

export const UserPost = ({bands}:PostProps) => {

  const [ recording, setRecording ] = useState(false)
  const [ recorder, setRecorder ] = useState<MediaRecorder | null>(null)
  const [ url, setUrl ] = useState('')
  const [ audio, setAudio ] = useState<Blob>()

  const songName = useRef<HTMLInputElement>(null)
  const band = useRef<HTMLSelectElement>(null)
  const file = useRef<HTMLInputElement>(null)
  const songKey = useRef<HTMLInputElement>(null)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setRecorder(new MediaRecorder(stream))
      })
      .catch((error) => {
        console.error(error)
      })
  },[])

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

  const submit = async () => {
    if (
      band.current &&
      songName.current &&
      audio
    ) {
      console.log(audio, typeof audio)
      await fetch('/api/newPost', {
        method: 'POST',
        body: JSON.stringify({
          pdf: '123',
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
    <Card mt='9rem' w='40rem'>
      <CardHeader fontWeight='bold'>Make A New Post!</CardHeader>
      <CardBody mt='-1.5rem'>
          <Stack spacing='3'>
            <FormControl>
              <Input ref={songName} placeholder='Song Title'></Input>
            </FormControl>

            <FormControl>
            <Select placeholder='Select A Band' ref={band}>
              {bands.map((band) => {
                return <option value={band.name} key={band.id}>{band.name}</option>
              })}
            </Select>
            </FormControl>

            <FormControl>
              <Input placeholder='Song Key' ref={songKey}/>
            </FormControl>
            <FormControl p='1rem'>
              {url && <audio src={url} controls></audio>}
            </FormControl>

          </Stack>
          <ButtonGroup>
            <Tooltip hasArrow label='Start Recording!'>
              <IconButton aria-label='startRecording' icon={<AiOutlinePlayCircle/>} onClick={record} bg='red.500'/>
            </Tooltip>
            <Button> Upload PDF </Button>
            <Button onClick={submit}> Submit </Button>
          </ButtonGroup>
      </CardBody>
    </Card>
  )
}