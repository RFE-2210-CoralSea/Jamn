import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/Prisma';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Cheak if the method is post, if not then send back error status
  if (req.method !== 'POST') {
    res.status(405).send({message: 'Only POST requests allowed!'})
    res.end();
  }
  else {
    //get server session
    const sessionData = await unstable_getServerSession(req, res, authOptions)
    const userData = await prisma.users.findMany({where: {email: sessionData?.user?.email}});
    const bandData = await prisma.bands.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        roles: {
          create: {
            userId: userData[0].id,
            admin: true,
            name: userData[0].name
          }
        }
      },
      include: {
        roles: true
      }
    })
    res.send(bandData)
  }
}