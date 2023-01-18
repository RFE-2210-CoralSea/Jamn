import { FormControl, CardHeader, Card, Stack, CardBody, VisuallyHiddenInput, Input, Button } from "@chakra-ui/react";
import { useState } from 'react'

const submitPostHandler = (title:string, artist:string, file:any) => {
  const postObj = {
    "name": title,
    "band": artist,
    "audio": file
  }
  // send post req with postObj as body
}

export const UserPost = () => {

  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [files, setFiles] = useState({})

  return (
    <Card mt='9rem' w='40rem'>
      <CardHeader fontWeight='bold'>Make A New Post!</CardHeader>
      <CardBody mt='-1.5rem'>
        <FormControl>
          <Stack spacing='3'>
            <Input onChange={(e) => setTitle(e.target.value)} placeholder='Song Title'></Input>
            <Input onChange={(e) => setArtist(e.target.value)} placeholder='Artists or Band'></Input>
            <Button onClick={() => document.getElementById('uploadSong')?.click()}> Upload Your Song
              <VisuallyHiddenInput id='uploadSong' type='file'/>
            </Button>
          </Stack>
        </FormControl>
        <Button type='submit' mt='1rem' onClick={() => submitPostHandler(title, artist, files)}> Submit </Button>
      </CardBody>
    </Card>
  )
}