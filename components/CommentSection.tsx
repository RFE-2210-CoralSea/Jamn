import { FormControl, Button, Input, Container, Stack, Heading, StackDivider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { UserComment } from './UserComment'

declare interface CommentData {
  name: string,
  profile_picture: string,
  text: string,
  date: string,
}

export const CommentSection = ({ comments }:any) => {

  useEffect(() => {
    console.log(comments)
  })
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const postCommentHandler = () => {
    setSubmitting(true)
    // send post request
    // need username
    // date/time of post
    // comment data
  }

  return (
    <Container>
      <Card w='38rem'>
        <CardHeader>
          <Heading size='md'>Comments</Heading>
        </CardHeader>
        <CardBody mt='-1.5rem'>
          <Stack divider={<StackDivider/>} spacing='3'>
            {comments.map((comment:CommentData) => {
              return <UserComment name={comment.name} profile_picture={comment.profile_picture} text={comment.text} date={comment.date}/>
            })}
            <StackDivider/>
          </Stack>
        </CardBody>

        <CardFooter mt='-2rem'>
          <FormControl>
            <Input onChange={(e) => setComment(e.target.value)} placeholder='Post a new comment!'></Input>
          </FormControl>
          <Button type='submit' onClick={postCommentHandler} isLoading={submitting} alignSelf='flex-end'> Submit </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}