import { Card, CardHeader, CardBody, Flex, Box, Text } from '@chakra-ui/react'
import { List, Tag, TagLabel, ListItem, useColorModeValue } from "@chakra-ui/react"
import { Tabs, TabList, Tab, TabPanels, TabPanel, Avatar } from '@chakra-ui/react'

type PersonalDescriptionProps = {
  instruments: string[],
  description: string,
  bands: string[]
}

export const PersonalDescription = ({ description, instruments, bands }:PersonalDescriptionProps) => {
    return(
      <Box display='center' w='15rem'>
        <Tabs variant='soft-rounded' colorScheme={useColorModeValue('blue', 'green')}>
          <TabList>
            <Tab>Bio</Tab>
            <Tab>Bands</Tab>
            <Tab>Instruments</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text fontSize='lg' fontWeight='bold'>
                {description}
              </Text>
            </TabPanel>
            <TabPanel>
               <List fontSize="lg" textAlign="center" fontWeight='bold'>
                {bands?.map((band) => {
                  return <Flex justifyContent='space-between' mb='1rem'>
                          <Tag size='xl' colorScheme={useColorModeValue('blue', 'green')} borderRadius='full' >
                            <Avatar size='sm' mr={2} />
                            <TagLabel fontWeight='bold' mr={3} key={band}>{band.name}</TagLabel>
                          </Tag>
                          </Flex>
                })}
                </List>
            </TabPanel>
            <TabPanel>
               <List fontSize="lg" textAlign="center" fontWeight='bold'>
                {instruments?.map((instrument) => {
                  return <ListItem key={instrument}> {instrument.instrument}</ListItem>
                })}
                </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    )
}

          // <Card boxShadow='dark-lg' bg={useColorModeValue('blue.200', 'royalblue')} rounded={10}>
          //   <CardHeader textAlign='center'>
          //     <Heading borderBottom='1px solid black'>Description</Heading>
          //   </CardHeader>
          //     <CardBody>
          //       <Text mt='-1rem' fontSize='xl'>
          //         {description}
          //       </Text>
          //     </CardBody>
          //     <CardHeader textAlign='center'>
          //     <Heading borderBottom='1px solid black'>Bands</Heading>
          //   </CardHeader>
          //     <CardBody mt='-1rem'>
          //       <Stack spacing='3rem'>
          //         <List fontSize="xl" textAlign="center">
          //           {bands.map((band) => {
          //             return <ListItem key={band}>{band}</ListItem>
          //           })}
          //         </List>
          //       </Stack>
          //     </CardBody>
          //   <CardHeader textAlign='center'>
          //     <Heading borderBottom="1px solid black" >Instruments</Heading>
          //   </CardHeader>
          //     <CardBody mt='-2rem'>
          //       <Stack spacing='3rem'>
          //         <List fontSize="xl" textAlign="center">
          //           {instruments.map((instrument) => {
          //             return <ListItem key={instrument}>{instrument}</ListItem>
          //           })}
          //         </List>
          //       </Stack>
          //     </CardBody>
          // </Card>
