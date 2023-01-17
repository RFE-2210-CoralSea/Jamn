import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  image: string,
  description: string,
  posts: [],
  members: []
};

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    res.send({
      name: 'test',
      image: 'test',
      description: 'test',
      posts: [],
      members:[]});
    res.status(200).end();
  } else if (req.method === 'POST') {
    res.status(201).end();
  }
};