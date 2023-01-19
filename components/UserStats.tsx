import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box
} from '@chakra-ui/react'

declare interface StatProps {
  stat: number
}
export const UserStats = ({stat}: StatProps) => {
  return (
    <Box textAlign='center'>
      <Stat>
        <StatLabel>Songs Posted Since Account Creation</StatLabel>
        <StatNumber>{stat}</StatNumber>
        <StatHelpText>Jan 17 - Jan 18</StatHelpText>
      </Stat>
    </Box>
  )
}