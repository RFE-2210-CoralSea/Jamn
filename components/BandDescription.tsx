import { Flex, Box, Editable, EditableInput, Input, EditablePreview, EditableTextarea } from '@chakra-ui/react'
import { List, Tag, TagLabel, useColorModeValue } from "@chakra-ui/react"
import { Tabs, TabList, Tab, TabPanels, TabPanel, Avatar } from '@chakra-ui/react'
import { Link, Text, Center, Button} from '@chakra-ui/react'
import { EditableControls } from './EditableControls'
import { useState } from 'react'
import { FormControl, FormLabel, FormHelperText,} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

type NewInputs = {
  email: string,
  bandId: number,
}

type Props = {
  description: string,
  members: [],
  bandId:number
}


export const BandDescription = ({ description, members, bandId }: Props) => {

  const [editDescrip, setDescrip] = useState('')
  const [editInstrument, setInstrument] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<NewInputs>();

  const onSubmit = (data: any) => {
    data.bandId = bandId
    fetch('/api/sendInvitation', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  return (
    <Box w='16rem'>
      <Tabs variant='soft-rounded' colorScheme={useColorModeValue('blue', 'green')}>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Members</Tab>
          <Tab>Invite</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Editable display="flex" gap={2} defaultValue={description} fontSize='lg' fontWeight='bold'>
              <EditablePreview/>
              <Input onChange={(e) => setDescrip(e.target.value)} as={EditableInput}/>
              <EditableControls/>
            </Editable>
          </TabPanel>
          <TabPanel>
            <Center>
              <List fontSize="lg" fontWeight='bold'>
              {members.map((role) => {
                return <Flex key={role.id} justifyContent='space-between' mb='1rem'>
                        <Tag size='xl' colorScheme={useColorModeValue('blue', 'green')} borderRadius='full'>
                            <Avatar size='sm' mr={2} />
                            <TagLabel fontWeight='bold' mr={3} key={role.name}><Link href={`bands/${role.id}`}>{role.name}</Link></TagLabel>
                        </Tag>
                        </Flex>
              })}
              </List>
            </Center>
              {members.length ? (<></>) : (<Text textAlign='center' fontWeight='bold'>You aren't apart of any bands!</Text>)}
          </TabPanel>
          <TabPanel>
            <FormControl>
              <FormLabel>User Email address</FormLabel>
              <Input type='email' {...register("email", { required: true })} />
              <FormHelperText>Invite your friends!</FormHelperText>
            </FormControl>
            <Button onClick={handleSubmit(onSubmit)}>Send Invite</Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

