import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import formidable from 'formidable'
import prisma from '../../lib/Prisma'

export const config = {
  api: {
    bodyParser: false
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

  // parse request body
  try {
    const data: any = await new Promise((resolve, reject) => {
      const form = formidable()
      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject({ err })
        resolve({ err, fields, files })
      })
    })
    const { bandName, songName } = data.fields
    const { pdf, audio } = data.files
    const date = Math.round(Date.now() / 1000)

    // ensure form data contains all required fields
    if (!bandName || !songName || !pdf || !audio) {
      res.status(422).end()
      return
    }

    // get userId and bandId
    const userId = (
      await prisma.users.findFirst({
        where: {
          email: session.user?.email as string
        }
      })
    )?.id
    const bandId = (
      await prisma.bands.findFirst({
        where: {
          name: bandName
        }
      })
    )?.id
    if (!userId || !bandId) {
      res.status(422).end()
      return
    }

    console.log(data)
    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
