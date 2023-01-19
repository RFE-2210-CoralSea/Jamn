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
    const userId = await prisma.users.findUnique({where: {email: req.body.email}, select: {id: true}});
    const sendInvite = await prisma.invitations.create({data: {userId: userId.id, bandId: req.body.bandId}});
    res.send('Invitation sent')
    res.end();
  }
}