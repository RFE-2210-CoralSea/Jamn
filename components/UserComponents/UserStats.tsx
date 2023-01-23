import { Box, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'

declare interface StatProps {
  stat: number
}
export const UserStats = ({ stat }: StatProps) => {
  return (
    <Box textAlign="center">
      <Stat>
        <StatLabel>Posts Since Account Creation</StatLabel>
        <StatNumber>{stat}</StatNumber>
        <StatHelpText>Joined January 17th</StatHelpText>
      </Stat>
    </Box>
  )
}
