import { NavBar } from "../components/NavBar";
import ProfileImage from "../components/ProfileImage";
import { Box } from '@chakra-ui/react'
import { PersonalDescription } from "../components/PersonalDescription";
import { useState, useEffect } from "react";
const personal = () => {
  interface Data {
    imgURL: string,
    name: string,
    instruments: string[],
  }

  const [data, setData] = useState({
    imgURL: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
    name: "Tracy Hillberg",
    instruments: ['cello', 'flute', 'drums'],
  })


  return(
    <Box position="relative">
      <NavBar />
      <ProfileImage imgURL={data.imgURL} name={data.name}/>
      <PersonalDescription instruments={data.instruments} sectionName="personal"/>
    </Box>
  )
}

export default personal;