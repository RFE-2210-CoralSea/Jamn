import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/Prisma';
import { unstable_getServerSession } from "next-auth/next"


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




export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  if (req.method === 'GET') {
    const session = await unstable_getServerSession(req, res)
    if (session) {
      const user = await prisma.users.findMany({
        where: {
          email: session.user?.email
        },
          include: {
            posts: {
              include: {
                comments: true
              }
            },
            instruments: true,
            roles: true
          },
      })
      if (user) {
        user[0].picture = user[0].picture.toString();
        return res.status(200).json(user[0])
      }
    }
  }
}