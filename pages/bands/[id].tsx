import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NavBar } from '../../components/NavBar'
import { ProfileImage } from '../../components/ProfileImage'
import { PersonalDescription } from '../../components/PersonalDescription'
import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export default function BandFeed(props: any) {
  const [ data, setData ] = useState(null)

  useEffect(() => {
    fetch('/api/bandFeed')
      .then(async (res) => {
        const newData = await res.json()
        setData(newData)
      })
  }, [])

  if (!data) return <></>

  return (
    <>
      <Head>
        <title>Band Feed</title>
      </Head>
    </>
  )
}