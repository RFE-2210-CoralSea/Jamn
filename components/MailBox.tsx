import { IconButton, Tooltip, Text, Box, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { AiOutlineMail } from 'react-icons/ai'
import {Accordion, AccordionItem, AccordionButton, AccordionPanel,AccordionIcon, } from '@chakra-ui/react'
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
          <ModalHeader>Hello Name! Check Your Invites</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion allowMultiple>
              {
                testData.map((invite) => {
                  return (
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex='1' textAlign='left'>
                            You have an invite from {invite.bandName}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} display="flex" justifyContent="space-between">
                        {invite.message}
                        <Box>
                          <Button>Accept</Button>
                          <Button>Decline</Button>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  )
                })
              }
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}