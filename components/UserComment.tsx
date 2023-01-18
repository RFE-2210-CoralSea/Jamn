import { Box, Heading, Tag, Avatar, TagLabel, Text, Wrap } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'

declare interface CommentProps {
  name: string,
  profile_picture: string,
  text: string,
  date: string
}

export const UserComment = ({ name, profile_picture, text, date }:CommentProps) => {
  return (
    <Box>
      <Heading size='xs'>
        <Tag size='lg' colorScheme={useColorModeValue('blue', 'green')} borderRadius='full'>
          <Avatar
            src={profile_picture}
            size='xs'
            name={name}
            ml={-1}
            mr={2}/>
          <TagLabel fontWeight='bold'>{name}</TagLabel>
        </Tag>
      </Heading>
      <Text pt='3' fontSize='lg' mb='1rem'>{text}</Text>
      <Wrap fontSize='xs'><span>{date}</span></Wrap>
    </Box>
  )
}