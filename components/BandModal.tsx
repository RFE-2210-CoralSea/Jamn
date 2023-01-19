import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { IconButton, Button, ButtonGroup, Stack, Editable, EditableInput,EditableTextarea, EditablePreview, Tooltip, Box, Image } from '@chakra-ui/react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { useDisclosure, useColorModeValue, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import {useState} from 'react'


type Inputs = {
  photo: string,
  name: string,
  description: string,
};

type Data = {
  name: string,
  image: string,
  description: string
}


export const BandModal = () => {
  const [imageSrc, setImageSrc] = useState()
  const [uploadData, setUploadData] = useState()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    console.log(event.target)
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
    const formData = new FormData();
    for( const file of fileInput.files) {
      formData.append('file', file)
    }
    formData.append('upload_preset', 'blue-ocean')
    const imageData = await fetch(`https://api.cloudinary.com/v1_1/dspcgkpzd/image/upload`, {
      method: "POST",
      body: formData
    }).then(r => r.json());
    console.log(imageData)
    setImageSrc(imageData.secure_url)
  }

  const logData = async (data: Data) => {
    data.image = imageSrc;
    fetch('/api/createBand', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  return (
    <>
      <Tooltip hasArrow label='Create a band!'>
        <IconButton aria-label='create band' bg='pink.300' icon={<AiOutlineUsergroupAdd/>} onClick={onOpen}/>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Create Your Band!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction='column' spacing='5'>
              <Box display="flex" flexDirection="column" >
                <Text mb={4} fontWeight="600">CHOOSE A BAND PHOTO</Text>
                <form onChange={handleOnChange} onSubmit={handleOnSubmit} method="post" style={{display: 'flex', justifyContent:"space-between", gap: "1rem"}}>
                  <input type="file" name="file"  style={{width: "100%"}}/>
                  <button style={{border: `2px solid ${useColorModeValue('#F9A824', '#87D8C8')}`, borderRadius: "5px", padding: "0.2rem", fontWeight: "700", width: "40%"}}>
                    <Text onClick={(e) => {
                    if(e.target.innerHTML === "Save Image"){
                      e.target.innerHTML = 'Saved!'
                    } else {
                     e.target.innerHTML = 'Save Image'
                    }
                  }}>Save Image</Text></button>
                </form>
              </Box>
              <Box width="100%" display="grid" placeItems="center" marginTop={10}>

                <Image src={imageSrc}
                  boxSize="200px"
                  align="center"
                  objectFit="cover"
                />
              </Box>
              <Editable placeholder='Enter Band Name' bg={useColorModeValue('gray.200', 'black')} borderRadius='5' p={2}>
                <EditablePreview/>
                <EditableInput {...register("name", { required: true })}/>
              </Editable>
              <Editable placeholder='Enter Band Description' bg={useColorModeValue('gray.200', 'black')} borderRadius='5' p={2}>
                <EditablePreview/>
                <EditableTextarea {...register("description", { required: true })}/>
              </Editable>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button onClick={handleSubmit(handleOnSubmit)}>Create Band Page</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}