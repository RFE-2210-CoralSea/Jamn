import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { IconButton, Button, ButtonGroup, Stack, Editable, EditableInput,EditableTextarea, EditablePreview, Tooltip, Box } from '@chakra-ui/react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { useDisclosure, useColorModeValue, Text } from '@chakra-ui/react'
import {useForm, SubmitHandler} from 'react-hook-form'
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
    setImageSrc(imageData.secure_url)
    console.log("data", imageData)
  }

  const logData = async (data: Data) => {
    data.image = imageSrc;
    console.log(data)
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
      <Tooltip hasArrow label='Band Login'>
        <IconButton aria-label='create band' bg='pink.300' icon={<AiOutlineUsergroupAdd/>} onClick={onOpen}/>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Your Band!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction='column' spacing='5'>
              <Box height="5em" display="flex" flexDirection="column" alignItems="center">
                <Text mb={4}>CHOOSE A BAND PHOTO</Text>
                <form onChange={handleOnChange} onSubmit={handleOnSubmit} method="post" style={{display: 'flex', justifyContent:"center"}}>
                  <input type="file" name="file"  style={{width: "70%"}}/>
                  <button style={{border: "1px solid white", borderRadius: "5px", padding:"0.3em"}} >Save Image</button>
                </form>
              </Box>
              <img src={imageSrc}/>
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
              <Button onClick={handleSubmit(logData)}>Create Band Page</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}