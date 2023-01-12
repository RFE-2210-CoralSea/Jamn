import { Box, Container } from '@chakra-ui/react';
import { DarkMode } from './DarkMode';

export const NavBar = (props:any) => {
  return (
    <Box as='nav' w='100%' css={{ backDropFilter: 'blur(10px)' }}{...props}>
      <Container display="flex" p={2} maxW="container.xl">
        <DarkMode/>
      </Container>
  </Box>
  )
}