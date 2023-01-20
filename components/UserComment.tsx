import { Box, Heading, Tag, Avatar, TagLabel, Text, Wrap } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react';
import timeago from 'epoch-timeago';


declare interface CommentProps {
  user: number,
  text: string,
  date: string
}

export const UserComment = ({ user, text, date }:CommentProps) => {
  const newDate = new Date(date);
  console.log(newDate)
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
      <Wrap fontSize='xs'><span>{`${newDate.toLocaleString()}`}</span></Wrap>
    </Box>
  )
}