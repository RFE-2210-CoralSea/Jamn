import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  List,
  useColorModeValue,
} from '@chakra-ui/react'
import { Avatar, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, TagLabel } from '@chakra-ui/react'
import { Button, Center, Text } from '@chakra-ui/react'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react'
import { EditableControls } from 'components'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

declare interface NewInputs {
  email: string
  bandId: number
}

declare interface BandProps {
  description: string
  members: []
  bandId: number
}

declare interface RoleValues {
  name: string,
  id: number,
}

export const BandDescription = ({ description, members, bandId }: BandProps) => {
  const [editDescrip, setDescrip] = useState('')
  const [editInstrument, setInstrument] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<NewInputs>()

  const onSubmit = (data: any) => {
    data.bandId = bandId
    fetch('/api/sendInvitation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  return (
    <Box w="16rem">
      <Tabs variant="soft-rounded" colorScheme={useColorModeValue('blue', 'green')}>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Members</Tab>
          <Tab>Invite</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Editable
              display="flex"
              gap={2}
              defaultValue={description}
              fontSize="lg"
              fontWeight="bold"
            >
              <EditablePreview />
              <Input onChange={(e) => setDescrip(e.target.value)} as={EditableInput} />
              <EditableControls />
            </Editable>
          </TabPanel>
          <TabPanel>
            <Center>
              <List fontSize="lg" fontWeight="bold">
                {members.map((role:RoleValues) => {
                  return (
                    <Flex key={role.id} justifyContent="space-between" mb="1rem">
                      <Tag
                        size="xl"
                        colorScheme={useColorModeValue('blue', 'green')}
                        borderRadius="full"
                      >
                        <Avatar size="sm" mr={2} />
                        <TagLabel fontWeight="bold" mr={3} key={role.name}>
                          <Text>{role.name}</Text>
                        </TagLabel>
                      </Tag>
                    </Flex>
                  )
                })}
              </List>
            </Center>
            {members.length ? (
              <></>
            ) : (
              <Text textAlign="center" fontWeight="bold">
                You aren't apart of any bands!
              </Text>
            )}
          </TabPanel>
          <TabPanel>
            <FormControl>
              <FormLabel>User Email address</FormLabel>
              <Input
                type="email"
                {...register('email', {
                  required: true
                })}
              />
              <FormHelperText>Invite your friends!</FormHelperText>
            </FormControl>
            <Button onClick={handleSubmit(onSubmit)}>Send Invite</Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
