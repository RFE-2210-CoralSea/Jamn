import { Box, Heading, Tag, Avatar, TagLabel, Text } from '@chakra-ui/react'

export const UserComment = ({}) => {
  return (
    <Box>
      <Heading size='xs'>
        <Tag size='lg' colorScheme='orange' borderRadius='full'>
          <Avatar
            src='/pfp.jpeg'
            size='xs'
            name='Jackson Zhu'
            ml={-1}
            mr={2}/>
          <TagLabel fontWeight='bold'>Jackson Zhu</TagLabel>
        </Tag>
      </Heading>
      <Text pt='3' fontSize='md'>Test Comment</Text>
    </Box>
  )
}