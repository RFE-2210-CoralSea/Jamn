import { Image, Text, Flex, Avatar, Badge, Box } from '@chakra-ui/react'

type ProfileImageProps = {
  image: string,
  name: string,
}

export const ProfileImage = ({ image, name }: ProfileImageProps) => {
  return(
    <>
        <Avatar
        src={image}
        boxShadow='dark-lg'
        border='1px solid black'
        objectFit='cover'
        boxSize='15rem'
        mt='10rem'
        />
        <Text textAlign='center' fontSize='3xl' fontWeight='bold'>{name}</Text>
    </>
  );
}


    // <>
    //   <Text textAlign='center' mt='5rem' fontSize='3xl' fontWeight='bold'>{name}</Text>
    //     <Image
    //     src={image}
    //     alt='/pfp.jpeg'
    //     boxShadow='dark-lg'
    //     border='1px solid black'
    //     objectFit='cover'
    //     boxSize='15rem'
    //     rounded={10}
    //     />
    // </>
