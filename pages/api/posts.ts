import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  band: string,
  text: string,
  audio: string,
  pdf: string
};

export default function getPosts (
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  if (req.method === 'GET') {
    res.status(200).end();
  } else if (req.method === 'POST') {
    res.status(201).end();
  }
};