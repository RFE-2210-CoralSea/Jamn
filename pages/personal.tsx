import dynamic from 'next/dynamic'
import ProfileImage from '../components/ProfileImage'
import { NavBar } from '../components/NavBar'
import { PersonalDescription } from '../components/PersonalDescription'
import { Container, Center } from '@chakra-ui/react'
import { useState } from 'react'
import { CommentSection } from '../components/CommentSection'

const LazyVisualizer = dynamic(() => import('../components/AudioVisualizer'), {
  ssr: false
})

import { unstable_getServerSession } from "next-auth";
const personal = () => {
  interface Data {
    imgURL: string,
    name: string,
    instruments: string[],
  }

  const [data, setData] = useState({
    imgURL: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
    name: 'Tracy Hillberg',
    instruments: ['cello', 'flute', 'drums'],
  })


  return(
    <>
      <NavBar />
      <Container>
        <ProfileImage imgURL={data.imgURL} name={data.name}/>
        <PersonalDescription instruments={data.instruments} sectionName='personal'/>
        <LazyVisualizer/>
        <CommentSection/>
      </Container>
    </>
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