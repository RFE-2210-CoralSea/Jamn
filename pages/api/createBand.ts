import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/Prisma';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Cheak if the method is post, if not then send back error status
  if (req.method !== 'POST') {
    res.status(405).send({message: 'Only POST requests allowed!'})
    res.end();
  }
  else {
    console.log(req.body);
    //get server session
    unstable_getServerSession(req, res, authOptions)
    .then((response) => {
      console.log(response);
      //check that session is not null
      if (response !== null) {
        prisma.bands.create({
          data: req.body
        })
        .then((response) => {
          console.log(response);

          res.status(200).end();
        })
        .catch((err) => {
          res.send(err);
          res.status(400).end();
        })
      }
    })
  }
}