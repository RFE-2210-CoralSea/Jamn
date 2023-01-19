import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/Prisma';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    res.status(405).send({message: 'Only PUT requests allowed!'});
    res.end();
  }
  const sessionData = await unstable_getServerSession(req, res, authOptions);
  const user = await prisma.users.findUnique({where: {email: sessionData?.user?.email}, select: {id: true, name: true}});
  if (req.body.accept) {
    prisma.roles.create({data: {userId: user?.id, bandId: req.body.bandId, admin: false, name: user?.name}})
    .then((response) => {
      return prisma.invitations.delete({where:
        {userId_bandId:
          {
            bandId: req.body.bandId,
            userId: user?.id
          }
        }})
    })
    .then((response) => {
      res.send('Invitation accepted');
      res.end();
    })
  } else {
    prisma.invitations.delete({where:
      {userId_bandId:
        {
          bandId: req.body.bandId,
          userId: user?.id
        }}})
    .then((response) => {
      res.send('Invitation deleted');
      res.end();
    })
  }
}