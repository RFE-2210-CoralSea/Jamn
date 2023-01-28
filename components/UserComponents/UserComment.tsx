import {
  Avatar, Box, Heading, Tag, TagLabel,
  Text, useColorModeValue, Wrap
} from '@chakra-ui/react'

export const UserComment = ({ user, text, date, name, picture }: UserCommentProps) => {
  const newDate = new Date(date)
  return (
    <Box>
      <Heading size="xs">
        <Tag size="lg" colorScheme={useColorModeValue('blue', 'green')} borderRadius="full">
          <Avatar src={picture} size="xs" name="" ml={-1} mr={2} />
          <TagLabel fontWeight="bold">{name}</TagLabel>
        </Tag>
      </Heading>
      <Text pt="3" fontSize="lg" mb="1rem">
        {text}
      </Text>
      <Wrap fontSize="xs">
        <span>{`${newDate.toLocaleString()}`}</span>
      </Wrap>
    </Box>
  )
}
