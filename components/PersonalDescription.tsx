import { Card, CardHeader, CardBody, Stack, Box, Text } from '@chakra-ui/react'
import { List, Heading, ListItem, useColorModeValue } from "@chakra-ui/react"

type PersonalDescriptionProps = {
  instruments: string[],
  description: string,
  bands: string[]
}

export const PersonalDescription = ({ description, instruments, bands }:PersonalDescriptionProps) => {
    return(
      <Box display='center' maxW='15rem'>
          <Card boxShadow='dark-lg' bg={useColorModeValue('teal.100', 'teal.600')} rounded={10}>
            <CardHeader>
              <Heading borderBottom='1px solid black' alignSelf='center'>Description</Heading>
            </CardHeader>
              <CardBody>
                <Text mt='-1rem' fontSize='xl'>
                  {description}
                </Text>
              </CardBody>
              <CardHeader>
              <Heading borderBottom='1px solid black' alignSelf='center'>Bands</Heading>
            </CardHeader>
              <CardBody mt='-1rem'>
                <Stack spacing='3rem'>
                  <List fontSize="xl" textAlign="center">
                    {bands.map((band) => {
                      return <ListItem key={band}>{band}</ListItem>
                    })}
                  </List>
                </Stack>
              </CardBody>
            <CardHeader>
              <Heading borderBottom="1px solid black" >Instruments</Heading>
            </CardHeader>
              <CardBody mt='-2rem'>
                <Stack spacing='3rem'>
                  <List fontSize="xl" textAlign="center">
                    {instruments.map((instrument) => {
<<<<<<< HEAD
                      return <ListItem>{instrument.instrument}</ListItem>
=======
                      return <ListItem key={instrument}>{instrument}</ListItem>
>>>>>>> c6967fd93adcb299412bb1796ed624c3cc100c4c
                    })}
                  </List>
                </Stack>
              </CardBody>
          </Card>
      </Box>
    )
}

