import { FormControl, Button, Input, Container, Stack, Heading, StackDivider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { UserComment } from './UserComment'
export const CommentSection = () => {

  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // grab all comments for posts
    // pass in necessary props to usercomment
    // map all comments
  })

  const postCommentHandler = () => {
    setSubmitting(true)
    // send post request
    // need username
    // date/time of post
    // comment data
  }

  return (
    <Container p='1rem'>
      <Card w='40rem' boxShadow='dark-lg'>
        <CardHeader>
          <Heading size='md'>Comments</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider/>} spacing='4'>
            <UserComment/>
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