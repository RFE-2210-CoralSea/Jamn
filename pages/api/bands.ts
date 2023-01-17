import type { NextApiRequest, NextApiResponse } from 'next'

type Post = {
  name: string,
  text: string,
  audio: string,
  pdf: string,
}

type Member = {
  name: string,
  role: string
}

type BandPage = {
  name: string,
  image: string,
  description: string,
  posts: Post[],
  members: Member[]
};

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<BandPage>
) {
  if (req.method === 'GET') {
    //this request will take in a band name, query db for the band id, then query for posts and users related to that band id
    res.send({
      name: 'Band name placeholder',
      image: 'bandimage.jpg',
      description: 'This is a band. We make music.',
      posts: [{name: 'ivan', text: 'my first post!', audio: 'sampleaudio.wav', pdf: 'samplepdf.pdf'}],
      members:[{name: 'ivan', role: 'administrator'}]});
    res.status(200).end();
  } else if (req.method === 'POST') {
    res.status(201).end();
  }
};