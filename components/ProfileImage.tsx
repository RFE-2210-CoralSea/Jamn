import { Image, Flex, Text } from '@chakra-ui/react'

type ProfileImageProps = {
  imgURL: string,
  name: string,
}

const ProfileImage = (props: ProfileImageProps) => {
  return(
    <Flex width='378px'
      height='263px'
      top='195px'
      left='42px'
      bg='#F7F1E3'
      align='center'
      position='absolute'
      direction='column'
      justify='center'
      rounded={10}>
      <Image
      src={props.imgURL}
      borderRadius='full'
      boxSize='150px'
      alt='pfp'
      border='1px solid black'
      mb={15}
      />
      <Text fontSize='4xl' fontWeight='bold' color='black'>
      {props.name}
      </Text>
    </Flex>
  );
}

export default ProfileImage;

