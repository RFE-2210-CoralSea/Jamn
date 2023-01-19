import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import prisma from '../../lib/Prisma'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb' // Set desired value here
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    res.status(422).end()
    return
  }

  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    res.status(422).end()
    return
  }
  console.log('test')

  // parse request body
  try {
    const { bandName, songName, pdf, audio } = JSON.parse(req.body)

    // get userId and bandId
    const userId = (
      await prisma.users.findFirst({
        where: {
          email: session.user?.email as string
        }
      })
    )?.id
    const band = await prisma.bands.findFirst({
      where: {
        name: 'The Killers'
      }
    })
    if (!userId || !band) {
      res.status(422).end()
      return
    }

    const post = await prisma.posts.create({
      data: {
        bandId: band.id,
        userId,
        audio: Buffer.from(audio),
        pdf: Buffer.from(pdf),
        image: band.image,
        text: songName,
        date: Date.now()
      }
    })
    console.log(post)

    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
