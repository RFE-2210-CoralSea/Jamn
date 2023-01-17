import { Image, Text, Box } from '@chakra-ui/react'

type ProfileImageProps = {
  imgURL: string,
  name: string,
}

const ProfileImage = (props: ProfileImageProps) => {
  return(
    <>
      <Text textAlign='center' mt='5rem' fontSize='3xl' fontWeight='bold'>{props.name}</Text>
        <Image
        src={props.imgURL}
        alt='pfp'
        boxShadow='dark-lg'
        border='1px solid black'
        objectFit='cover'
        boxSize='15rem'
        rounded={10}
        />
    </>
  );
}

export default ProfileImage;

