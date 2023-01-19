import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/Prisma';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  if (req.method !== 'GET') {
    res.status(405).send({message: 'Only GET requests allowed!'})
    res.end();
  } else {
    const sessionData = await unstable_getServerSession(req, res, authOptions)
    const userData = await prisma.users.findUnique(
      {where:
        {email: sessionData?.user?.email},
        select: {
          id: true
        }
      }
    );
    const bandInvites = await prisma.invitations.findMany({where: {userId: userData.id}, include: {bands: true}});
    res.send(bandInvites);
    res.end();
  }
}