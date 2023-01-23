// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/Prisma'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const band = await prisma.bands.findUnique({
    where: {
      id: 1
    }
  })
  console.log(band)
  res.status(200).json({ name: 'John Doe' })
}
