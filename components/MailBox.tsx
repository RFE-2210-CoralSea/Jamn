import { IconButton, Tooltip, Text, Box, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { AiOutlineMail } from 'react-icons/ai'
import {Accordion, AccordionItem, AccordionButton, AccordionPanel,AccordionIcon, useColorModeValue } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import {useState, useEffect} from 'react'
import { getSession } from 'next-auth/client'



type IdProp = {
  id: number

}


export const MailBox = ({id, session}:IdProp) => {

  const [data, setData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
     fetch('api/getInvitations')
      .then(async (response) => {
        const newData = await response.json()
        console.log("This is the data" + JSON.stringify(newData))
        setData(newData)
      })
  }, [data])


  const acceptInvite = (bandId) => {
    let response = {
      bandId: bandId,
      accept: true
    }
    fetch('/api/respondInvitation', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(response)
    })
  }
  const declineInvite = (bandId) => {
    let response = {
      bandId: bandId,
      accept: false
    }
    fetch('/api/respondInvitation', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(response)
    })
  }

  return (
    <>
      <Box>
        <Tooltip hasArrow label='Check Invites'>
          <Box>
            <IconButton aria-label='login' onClick={onOpen} bg='teal.500' icon={<AiOutlineMail/>}/>
          </Box>
        </Tooltip>
        {data.length > 0 &&
          <Text as="span"
          width="1.5rem"
          height="1.5rem"
          position="absolute"
          top="0.65rem"
          right="0.65rem"
          borderRadius="100%"
          background="red"
          textAlign="center"
          >{data.length}</Text>
        }
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" display="flex" flexDirection="column" >
            <Text>
              Hello
              <Text as="span"
                bgGradient={useColorModeValue('linear(to-r, #F9A824, #87D8C8)','linear(to-r, #9B9B9B, #87D8C8)' )}
                bgClip="text"
                fontWeight="800"
              > Name!
              </Text>
            </Text>
            <Text as="span" >Check Your Invites</Text></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion allowMultiple>
              {
                data.map((invite, i) => {
                  return (
                    <AccordionItem key={i}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex='1' textAlign='left'>
                            <Text
                              fontWeight="700"
                            >You have an invite from
                            <Text as="span"
                              color={useColorModeValue('#F9A824','#87D8C8' )}
                            > {invite.bands.name.toUpperCase()}</Text></Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} display="flex" flexDirection="column" justifyContent="space-between">
                        {invite.bands.description}
                        <Box mt={5}>
                          <Button mr={2} size="sm"><Text _hover={{color: "green"}} onClick={() => acceptInvite(invite.bandId)}>Accept</Text></Button>
                          <Button size="sm"><Text _hover={{color: "red"}} onClick={() => declineInvite(invite.bandId)}>Decline</Text></Button>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  )
                })
              }
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export async function getServerSideProps (context:any) {
  const session = await unstable_getServerSession(context.req, context.res);

  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }
  console.log(session)
  return {
    props: {
      session
    },
  }
}