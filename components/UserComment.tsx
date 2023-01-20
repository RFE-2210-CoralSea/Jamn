import { Box, Heading, Tag, Avatar, TagLabel, Text, Wrap } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'

declare interface CommentProps {
  user: number,
  text: string,
  date: string
}

export const UserComment = ({ user, text, date }:CommentProps) => {


  return (
    <Box>
      <Heading size='xs'>
        <Tag size='lg' colorScheme={useColorModeValue('blue', 'green')} borderRadius='full'>
          <Avatar
            src=''
            size='xs'
            name=''
            ml={-1}
            mr={2}/>
          <TagLabel fontWeight='bold'>Joe Lin</TagLabel>
        </Tag>
      </Heading>
      <Text pt='3' fontSize='lg' mb='1rem'>{text}</Text>
      <Wrap fontSize='xs'><span>{new Date(date).toLocaleDateString("en-US")}</span></Wrap>
    </Box>
  )
}