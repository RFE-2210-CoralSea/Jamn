import Head from 'next/head'
import { Container } from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'
import { getProviders } from 'next-auth/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Blue-Ocean</title>
      </Head>

      <Container>
        <NavBar/>
        Hello World
      </Container>
    </>
  )
}
