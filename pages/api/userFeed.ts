import type { NextApiRequest, NextApiResponse } from 'next'

type Comment = {
  name: string,
  profile_picture: string,
  text: string,
  date: string
}

type Post = {
  name: string,
  band: string,
  audio: string,
  pdf: string,
  date: string,
  text: string,
  comments: Comment[]
}

type User = {
  name: string,
  description: string,
  instruments: string[],
  image: string,
  posts: Post[],
};

const SampleData = {
  name: 'Jackson',
  description: 'hello world and welcome to my page',
  instruments: ['Cello', 'Piano', 'Drums'],
  bands: ['Super Sick Band', 'Awesome Band'],
  image: '/pfp.jpeg',
  posts: [
    {
      name: 'Joe',
      band: 'Super Sick Band',
      audio: 'testaudio.wav',
      pdf: 'testpdf.pdf',
      date: '01/17/2023 @ 8:09pm',
      text: 'Hello user feed',
      comments: [{
        name: 'Darrien',
        profile_picture: 'sampleprofpic.jpg',
        text: 'hello comments',
        date: '01/17/2023 @ 8:10pm'
      },
      {
        name: 'Joe',
        profile_picture: 'testpfp.jpg',
        text: "test",
        date: '01/17/2023 @ 8:11pm'
      }]
    }
  ]
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  if (req.method === 'GET') {
    res.send(SampleData);
  }
};