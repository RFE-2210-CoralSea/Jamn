import {
  Avatar,
  Box,
  Heading,
  Tag,
  TagLabel,
  Text,
  Wrap,
  useColorModeValue
} from '@chakra-ui/react'

declare interface CommentProps {
  user: number
  text: string
  date: string
  name: string
}

export const UserComment = ({ user, text, date, name }: CommentProps) => {
  const newDate = new Date(date)
  console.log(user)
  return (
    <Box>
      <Heading size="xs">
        <Tag size="lg" colorScheme={useColorModeValue('blue', 'green')} borderRadius="full">
          <Avatar src="" size="xs" name="" ml={-1} mr={2} />
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
