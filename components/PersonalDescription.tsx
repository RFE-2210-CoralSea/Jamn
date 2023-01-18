import { Card, CardHeader, CardBody, Stack, Box, Text } from '@chakra-ui/react'
import { List, Heading, ListItem } from "@chakra-ui/react"

type PersonalDescriptionProps = {
  instruments: string[],
  description: string
}

export const PersonalDescription = ({ description, instruments }:PersonalDescriptionProps) => {
    return(
      <Box display='center'>
          <Card boxShadow='dark-lg' bg='teal.600' rounded={10}>
            <CardHeader>
              <Heading borderBottom='1px solid black'>Description</Heading>
            </CardHeader>
              <CardBody>
                <Text align='center'>
                  {description}
                </Text>
              </CardBody>
            <CardHeader>
              <Heading borderBottom="1px solid black" >Instruments</Heading>
            </CardHeader>
              <CardBody mt='-2rem'>
                <Stack spacing='3rem'>
                  <List fontSize="2xl" textAlign="center">
                    {instruments.map((instrument) => {
                      return <ListItem>{instrument.instrument}</ListItem>
                    })}
                  </List>
                </Stack>
              </CardBody>
          </Card>
      </Box>
    )
}

