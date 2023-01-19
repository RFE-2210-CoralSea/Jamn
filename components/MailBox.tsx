import { IconButton, Tooltip, Text, Box, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { AiOutlineMail } from 'react-icons/ai'
import {Accordion, AccordionItem, AccordionButton, AccordionPanel,AccordionIcon, useColorModeValue } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'

type IdProp = {
  id: number
}


export const MailBox = ({id}:IdProp) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const testData = [
    {
      bandName: "beetles",
      message: "Come join our band"
    },
    {
      bandName: "queen",
      message: "Check out our band page"
    },
  ]

  return (
    <>
      <Box>
        <Tooltip hasArrow label='Check Invites'>
          <Box>
            <IconButton aria-label='login' onClick={onOpen} bg='teal.500' icon={<AiOutlineMail/>}/>
          </Box>
        </Tooltip>
        {testData.length === 2 &&
          <Text as="span"
          width="1.5rem"
          height="1.5rem"
          position="absolute"
          top="0.65rem"
          right="0.65rem"
          borderRadius="100%"
          background="red"
          textAlign="center"
          >{testData.length}</Text>
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
                testData.map((invite, i) => {
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
                            > {invite.bandName.toUpperCase()}</Text></Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} display="flex" flexDirection="column" justifyContent="space-between">
                        {invite.message}
                        <Box mt={5}>
                          <Button mr={2} size="sm"><Text _hover={{color: "green"}}>Accept</Text></Button>
                          <Button size="sm"><Text _hover={{color: "red"}}>Decline</Text></Button>
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