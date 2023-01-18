import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import prisma from '../../lib/Prisma'

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
  console.log(req.body)
  res.status(200).end()
}
