import { Box, Button, IconButton, Text, Tooltip } from '@chakra-ui/react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useColorModeValue
} from '@chakra-ui/react'
import { acceptInvite, declineInvite } from '../lib/InviteFuncs'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'

export const MailBox = () => {
  const { data: session } = useSession()
  const [data, setData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    fetch('api/getInvitations').then(async (response) => {
      const newData = await response.json()
      setData(newData)
    })
  }, [])

  return (
    <>
      <Box>
        <Tooltip hasArrow label="Check Invites">
          <Box>
            <IconButton
              aria-label="login"
              onClick={onOpen}
              bg="teal.500"
              icon={<AiOutlineMail />}
            />
          </Box>
        </Tooltip>
        {data.length > 0 && (
          <Text
            as="span"
            width="1.5rem"
            height="1.5rem"
            position="absolute"
            top="0.65rem"
            right="0.65rem"
            borderRadius="100%"
            background="red"
            textAlign="center"
          >
            {data.length}
          </Text>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" display="flex" flexDirection="column">
            <Text>
              Hello
              <Text
                as="span"
                bgGradient={useColorModeValue(
                  'linear(to-r, #F9A824, #87D8C8)',
                  'linear(to-r, #9B9B9B, #87D8C8)'
                )}
                bgClip="text"
                fontWeight="800"
              >
                {' '}
                {session.user.name}!
              </Text>
            </Text>
            <Text as="span">Check Your Invites</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion allowMultiple>
              {data.map((invite, i) => {
                return (
                  <AccordionItem key={i}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Text fontWeight="700">
                            You have an invite from
                            <Text as="span" color={useColorModeValue('#F9A824', '#87D8C8')}>
                              {' '}
                              {invite.bands.name.toUpperCase()}
                            </Text>
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pb={4}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      {invite.bands.description}
                      <Box mt={5}>
                        <Button mr={2} size="sm">
                          <Text
                            _hover={{
                              color: 'green'
                            }}
                            onClick={() => acceptInvite(invite.bandId)}
                          >
                            Accept
                          </Text>
                        </Button>
                        <Button size="sm">
                          <Text
                            _hover={{
                              color: 'red'
                            }}
                            onClick={() => declineInvite(invite.bandId)}
                          >
                            Decline
                          </Text>
                        </Button>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
