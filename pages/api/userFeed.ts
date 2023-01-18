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
  name: 'Joe Lin',
  description: 'hello world',
  instruments: ['Cello', 'Piano', 'Drums'],
  bands: ['Super Sick Band', 'Awesome Band'],
  image: '/pfp.jpg',
  posts: [
    {
      postId: '1',
      name: 'Slide',
      band: 'Frank Ocean',
      image: '/slide.jpg',
      audio: '/slide frank ocean.mp4',
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
    },
    {
      postId: '2',
      name: 'DieYoung',
      band: 'Sleepy Hallow',
      image: '/dieyoung.jpg',
      audio: '/die young.mp3',
      pdf: 'testpdf2.pdf',
      date: '01/17/2023 @ 10:23pm',
      text: 'test Text',
      comments: [{
        name: 'bro',
        profile_picture: 'broooo.jpg',
        text: 'BROOOOOOO',
        date: '01/17/2023 @ 10:30pm'
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