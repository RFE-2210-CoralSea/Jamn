import { Card, CardHeader, CardBody, Stack, Box } from '@chakra-ui/react'
import { List, Heading } from "@chakra-ui/react"
import { ItemList } from "./ItemList"
type PersonalDescriptionProps = {
  instruments: string[],
  sectionName: string,
}

export const PersonalDescription = (props:PersonalDescriptionProps ) => {
    return(
      <Box display='center'>
          <Card boxShadow='dark-lg' bg='teal.600' rounded={10}>
            <CardHeader>
              <Heading borderBottom="1px solid black" >Instruments</Heading>
            </CardHeader>
              <CardBody mt='-2rem'>
                <Stack spacing='3rem'>
                  <List fontSize="2xl" textAlign="center">
                  <ItemList items={props.instruments}/>
                  </List>
                </Stack>
              </CardBody>
          </Card>
      </Box>
    )
}

