import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/Prisma'

type Comment = {
  name: string
  profile_picture: string
  text: string
  date: string
}

type Post = {
  name: string
  text: string
  audio: string
  pdf: string
  date: string
  comments: Comment[]
}

type Member = {
  name: string
  role: string
}

type Band = {
  name: string
  image: string
  description: string
  posts: Post[]
  roles: Member[]
}

const sampleData = {
  name: 'Super Sick Band',
  image: '/slide.jpg',
  description: 'we make music and stuff',
  posts: [
    {
      name: 'Ivan',
      text: 'Hello band feed',
      audio: 'sampleaudio.wav',
      pdf: 'samplepdf.pdf',
      date: '01/17/2023 @ 8:09pm',
      comments: [
        {
          name: 'Gerritt',
          profile_picture: 'sampleprofpicture.jpg',
          text: 'Hello band post comments',
          date: '01/17/2023 @ 8:10pm'
        }
      ]
    }
  ],
  members: [
    {
      name: 'Ivan',
      role: 'Administrator'
    },
    {
      name: 'Gerritt',
      role: 'Member'
    },
    {
      name: 'Joe',
      role: 'Member'
    }
  ]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Band>
) {
  if (req.method === 'GET') {
    let bandPage: Band
    //this request will take in a band name, query db for the band id, then query for posts and users related to that band id
    prisma.bands
      .findUnique({ where: { id: 1 }, include: { roles: true, posts: true } })
      .then((response) => {
        console.log(response)
        // bandPage = response;
        // return prisma.roles.findMany({where: {bandId: 1}});
      })
    // .then((response) => {
    //   console.log('members', response);
    //   bandPage.members = response;
    // });
    res.send(sampleData)
    res.status(200).end()
  } else if (req.method === 'POST') {
    res.status(201).end()
  }
}
