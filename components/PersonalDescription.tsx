import { Flex, Box, Editable, EditableInput, Input, EditablePreview } from '@chakra-ui/react'
import { List, Tag, TagLabel, ListItem, useColorModeValue } from "@chakra-ui/react"
import { Tabs, TabList, Tab, TabPanels, TabPanel, Avatar } from '@chakra-ui/react'
import { Link, Text, Center } from '@chakra-ui/react'
import { EditableControls } from './EditableControls'
import { useState } from 'react'

declare interface InstrumentData {
  id: number,
  userId: number,
  instrument: string,
}

declare interface PersonalDescriptionProps {
  instruments: InstrumentData[]
  description: string,
  roles: RoleData[]
}

declare interface RoleData {
  name: string,
  id: number
}

export const PersonalDescription = ({ description, instruments, roles }:PersonalDescriptionProps) => {

  const UpdateDescriptionHandler = async (section:string, changedVal:string) => {
    let updateData = {}
    if (section === 'bio') {
      updateData = {
        'bio': changedVal
      }
    } else if (section === 'instruments') {
      updateData = {
        'instruments': changedVal
      }
    }
    const response = await fetch('api/userFeed', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updateData)
    })
    return response
  }

  const [editDescrip, setDescrip] = useState('')
  const [editInstrument, setInstrument] = useState('')

  return (
    <Box w='16rem'>
      <Tabs variant='soft-rounded' colorScheme={useColorModeValue('blue', 'green')}>
        <TabList>
          <Tab>Bio</Tab>
          <Tab>Bands</Tab>
          <Tab>Instruments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Editable onSubmit={() => UpdateDescriptionHandler('bio', editDescrip)} defaultValue={description} fontSize='lg' fontWeight='bold'>
              <EditablePreview/>
              <Input onChange={(e) => setDescrip(e.target.value)} as={EditableInput}/>
              <EditableControls/>
            </Editable>
          </TabPanel>
          <TabPanel>
            <Center>
              <List fontSize="lg" fontWeight='bold'>
              {roles.map((role) => {
                return <Flex key={role.id} justifyContent='space-between' mb='1rem'>
                        <Tag size='xl' colorScheme={useColorModeValue('blue', 'green')} borderRadius='full'>
                            <Avatar size='sm' mr={2} />
                            <TagLabel fontWeight='bold' mr={3} key={role.name}><Link href={`bands/${role.id}`}>{role.name}</Link></TagLabel>
                        </Tag>
                        </Flex>
              })}
              </List>
            </Center>
              {roles.length ? (<></>) : (<Text textAlign='center' fontWeight='bold'>You aren't apart of any bands!</Text>)}
          </TabPanel>
          <TabPanel>
              <List fontSize="lg" textAlign="center" fontWeight='bold'>
              {instruments.map((instrument) => {
                return <ListItem key={instrument.id}>• {instrument.instrument}</ListItem>
              })}
              </List>
            <Editable textAlign='center' onSubmit={() => UpdateDescriptionHandler('instruments', editInstrument)} defaultValue='Add a new instrument' fontSize='lg'>
              <EditablePreview/>
              <Input onChange={(e) => setInstrument(e.target.value)} as={EditableInput}/>
              <EditableControls/>
            </Editable>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

