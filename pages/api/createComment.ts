import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/Prisma';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send({message: 'Only POST requests allowed!'})
    res.end();
  } else {
    const sessionData = await unstable_getServerSession(req, res, authOptions);
    const userData = await prisma.users.findUnique(
      {where:
        {email: sessionData?.user?.email},
        select: {
          id: true
        }
      }
    );
    prisma.comments.create({data: {
      postId: req.body.postId,
      userId: userData?.id,
      date: Date.now(),
      text: req.body.text
    }})
    .then((response) => {
      res.send(response);
      res.end();
    })
    .catch((err) => {
      res.send('Invalid comment, please check query parameters');
      res.end();
    })
  }
}