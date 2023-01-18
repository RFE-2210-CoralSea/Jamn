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

  if (req.method === 'PUT') {
    const session = await unstable_getServerSession(req, res);
    if (session) {
      const update = async (key:string) => {
        let updateData;
        switch(key) {
          case 'picture':
            updateData = {
              picture: req.body.picture
            }
            break;
          case 'bio':
            updateData = {
              bio: req.body.bio
            }
            break;
          case 'name':
            updateData = {
              name: req.body.name
            }
            break;
        }
        let insert = await prisma.users.updateMany({
          where: {
            email: session.user?.email
          },
          data: updateData
        });
        return insert.count === 1 ? res.status(200).json({message: true}) : res.status(500).json({message: false})
      }
      let keys = Object.keys(req.body);
      return await update(keys[0])
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}