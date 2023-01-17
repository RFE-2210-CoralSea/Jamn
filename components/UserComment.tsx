import { Box, Heading, Tag, Avatar, TagLabel, Text } from '@chakra-ui/react'

export const UserComment = ({}) => {
  return (
    <Box>
      <Heading size='xs' >
        <Tag size='lg' colorScheme='orange' borderRadius='full'>
          <Avatar
            src=''
            size='xs'
            name='joe lin'
            ml={-1}
            mr={2}/>
          <TagLabel>Joe Lin</TagLabel>
        </Tag>
      </Heading>
      <Text pt='2' fontSize='sm'>Test Comment</Text>
    </Box>
  )
}