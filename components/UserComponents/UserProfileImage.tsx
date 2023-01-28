import { EditIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, Button, IconButton, Text, VisuallyHidden } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const UserProfileImage = ({ image, username }: UserProfileImageProps) => {
  const [imageSrc, setImageSrc] = useState()
  const [, setUploadData] = useState()
  const {
    handleSubmit,
    formState: {}
  } = useForm<UserProfileImageProps>()

  const UploadHandler = async (event: { preventDefault: () => void; currentTarget: any }) => {
    event.preventDefault()
    const form = event.currentTarget
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')
    const formData = new FormData()
    for (const file of fileInput.files) {
      formData.append('file', file)
    }
    formData.append('upload_preset', 'blue-ocean')
    const imageData = await fetch(`https://api.cloudinary.com/v1_1/dspcgkpzd/image/upload`, {
      method: 'POST',
      body: formData
    }).then((r) => r.json())
    setImageSrc(imageData.secure_url)
    document.getElementById('saveToDB')?.click()
  }

  const logData = () => {
    let data = {
      picture: imageSrc
    }
    fetch('api/userFeed', {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  const handleOnChange = (changeEvent: { target: { files: Blob[] } }) => {
    const reader = new FileReader()

    reader.onload = function (onLoadEvent) {
      if (onLoadEvent.target) {
        setImageSrc(onLoadEvent.target.result)
        setUploadData(undefined)
      }
    }
    reader.readAsDataURL(changeEvent.target.files[0])
    document.getElementById('submitPic')?.click()
  }

  useEffect(() => {
    document.getElementById('editProfilePic')?.addEventListener('click', () => {
      document.getElementById('uploadPic')?.click()
    })
  })

  return (
    <>
      <Avatar
        src={image}
        boxShadow="dark-lg"
        border="1px solid black"
        objectFit="cover"
        boxSize="15rem"
        mt="10rem"
      >
        <AvatarBadge id="editProfilePic" as={IconButton} icon={<EditIcon />} />
      </Avatar>
      <Text textAlign="center" fontSize="3xl" fontWeight="bold">
        {username}
      </Text>
      <VisuallyHidden>
        <form onSubmit={UploadHandler} id="picForm" onChange={handleOnChange}>
          <input id="uploadPic" type="file" name="file" />
          <Button id="submitPic" type="submit" />
        </form>
        <Button id="saveToDB" onClick={handleSubmit(logData)} />
      </VisuallyHidden>
    </>
  )
}
