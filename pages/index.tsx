import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Container } from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Blue-Ocean</title>
      </Head>

      <Container>
        {/* <NavBar/> */}
        Hello WOrld
      </Container>
    </>
  )
}
