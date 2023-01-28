import { Box, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'

export const UserStats = ({ stat }: UserStatProps) => {
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
