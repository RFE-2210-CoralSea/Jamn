import { Flex, Box, Editable, EditableInput, Input, EditablePreview } from '@chakra-ui/react'
import { List, Tag, TagLabel, ListItem, useColorModeValue } from "@chakra-ui/react"
import { Tabs, TabList, Tab, TabPanels, TabPanel, Avatar } from '@chakra-ui/react'
import { FormControl, Button } from '@chakra-ui/react'
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

const UpdateDescriptionHandler = () => {

}

export const PersonalDescription = ({ description, instruments, roles }:PersonalDescriptionProps) => {

  const [editDescrip, setDescrip] = useState(description)
  const [editInstrument, setInstrument] = useState(instruments)
  const [editRoles, setRoles] = useState(roles)

  return (
    <Box display='center' w='15rem'>
      <Tabs variant='soft-rounded' colorScheme={useColorModeValue('blue', 'green')}>
        <TabList>
          <Tab>Bio</Tab>
          <Tab>Bands</Tab>
          <Tab>Instruments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Editable defaultValue={description} fontSize='lg' fontWeight='bold'>
              <EditablePreview/>
              <Input as={EditableInput}/>
              <EditableControls/>
            </Editable>
          </TabPanel>
          <TabPanel>
              <List fontSize="lg" textAlign="center" fontWeight='bold'>
              {roles.map((role) => {
                return <Flex key={role.id} justifyContent='space-between' mb='1rem'>
                        <Tag size='xl' colorScheme={useColorModeValue('blue', 'green')} borderRadius='full' >
                          <Avatar size='sm' mr={2} />
                          <TagLabel fontWeight='bold' mr={3} key={role.name}>
                            <Editable defaultValue={role.name}>
                              <EditablePreview/>
                              <Input as={EditableInput}/>
                              <EditableControls/>
                            </Editable>
                          </TagLabel>
                        </Tag>
                        </Flex>
              })}
              </List>
              {roles.length ? (<></>) : (
                <Flex display='flex-start' mt='1rem'>
                  <FormControl>
                    <Input placeholder='Add a new band'></Input>
                  </FormControl>
                  <Button type='submit' alignSelf='flex-end' mt='1rem'> Submit </Button>
                </Flex>
              )}
          </TabPanel>
          <TabPanel>
              <List fontSize="lg" textAlign="center" fontWeight='bold'>
              {instruments.map((instrument) => {
                return <ListItem key={instrument.instrument}>
                  <Editable defaultValue={instrument.instrument}>
                    <EditablePreview/>
                    <Input as={EditableInput}/>
                    <EditableControls/>
                  </Editable>
                </ListItem>
              })}
              </List>
              <Flex display='flex-start' mt='1rem'>
                <FormControl>
                  <Input placeholder='Add a new instrument'></Input>
                </FormControl>
                <Button type='submit'alignSelf='flex-end' mt='1rem'> Submit </Button>
              </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

