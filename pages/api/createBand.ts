import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/Prisma';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
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