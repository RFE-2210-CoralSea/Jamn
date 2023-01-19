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
    prisma.invitations.create({data: {userId: userId.id, bandId: req.body.bandId}})
    .then((response) => {
      res.send('Invitation sent')
      res.end();
    })
    .catch((err) => {
      res.send('Invalid invitation | Please check that the user\' email is valid, that this is not a duplicate invitation, or the band id');
      res.status(400).end();
    })
  }
}