import { NavBar } from "../components/NavBar";
import ProfileImage from "../components/ProfileImage";
import { Box } from '@chakra-ui/react'
import { PersonalDescription } from "../components/PersonalDescription";
import { useState, useEffect } from "react";
import { unstable_getServerSession } from "next-auth";
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


export async function getServerSideProps(context:any) {
  const session = await unstable_getServerSession(context.req, context.res);

  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }
  console.log(session)

  // const feed = await fetch('/api/test');


  return {
    props: {
      session
    },
  };
}