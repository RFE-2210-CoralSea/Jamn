import {  Text, Avatar, AvatarBadge, IconButton, VisuallyHiddenInput} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons';
import { useEffect } from 'react'

type ProfileImageProps = {
  image: string,
  name: string,
}

const UploadHandler = () => {
  // implement uploading image
  // replace image link in database
}

export const ProfileImage = ({ image, name }: ProfileImageProps) => {

  useEffect(() => {
    document.getElementById('editProfilePic')?.addEventListener('click', () => {
      document.getElementById('uploadPic')?.click()
    })
  })
  return (
    <>
        <Avatar
        src={image}
        boxShadow='dark-lg'
        border='1px solid black'
        objectFit='cover'
        boxSize='15rem'
        mt='10rem'
        ><AvatarBadge id='editProfilePic' as={IconButton} icon={<EditIcon/>}/></Avatar>
        <Text textAlign='center' fontSize='3xl' fontWeight='bold'>{name}</Text>
        <VisuallyHiddenInput id='uploadPic' onSubmit={UploadHandler} type='file'/>
    </>
  );
}

