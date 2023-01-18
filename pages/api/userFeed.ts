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
      if (user.length > 0) {
        if (user[0].roles.length > 0) {
          for (let i = 0; i < user[0].roles.length; i++) {
            const bandNames = await prisma.bands.findUnique({
              where: {
                id: user[0].roles[i].bandId
              }
            })
            if (bandNames) {
              user[0].roles[i] = {
                name: bandNames.name,
                id: bandNames.id
              }
            }
          }
        }
        console.log(user[0])
        return res.status(200).json(user[0])
      }
    }
  }
}