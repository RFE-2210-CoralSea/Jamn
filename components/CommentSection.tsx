import { FormControl, Button, Input, Stack, Heading, StackDivider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { useState } from 'react'
import { UserComment } from './UserComment'

declare interface CommentData {
  name: string,
  profile_picture: string,
  text: string,
  date: string,
}

export const CommentSection = ({ comments, postId, bandId }:any) => {

  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const postCommentHandler = () => {
    setSubmitting(true)
    let data = {
      'bandId': bandId,
      'postId': postId,
      'text': comment
    }
    fetch('bands/createComment', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((response) => {
        console.log(response)
        setSubmitting(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
      <Card w='40rem'>
        <CardHeader>
          <Heading size='md'>Comments</Heading>
        </CardHeader>
        <CardBody mt='-1.5rem'>
          <Stack divider={<StackDivider/>} spacing='3'>
            {comments?.map((comment:CommentData, index:number) => {
              return <UserComment name={comment.name} profile_picture={comment.profile_picture} text={comment.text} date={comment.date} key={index}/>
            })}
            <StackDivider/>
          </Stack>
        </CardBody>

        <CardFooter mt='-2rem'>
          <FormControl>
            <Input onChange={(e) => setComment(e.target.value)} placeholder='Post a new comment!'></Input>
          </FormControl>
          <Button onClick={postCommentHandler} isLoading={submitting} alignSelf='flex-end'> Submit </Button>
        </CardFooter>
      </Card>
  )
}