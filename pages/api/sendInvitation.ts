import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/Prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send({message: 'Only POST requests allowed!'});
    res.end();
  } else {
    const invitation = await prisma.invitations.create({})
  }
}