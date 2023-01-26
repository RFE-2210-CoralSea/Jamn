import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'

import prisma from '../../lib/Prisma'

type Comment = {
  name: string
  profile_picture: string
  text: string
  date: string
}

type Post = {
  name: string
  band: string
  audio: string
  pdf: string
  date: string
  text: string
  comments: Comment[]
}

type Instrument = {
  instrument: string
  id: number
  userId: number
}

type Roles = {
  name: string
  id: number
}

type User = {
  name?: string
  bio?: string
  instruments?: Instrument[]
  picture?: string
  posts?: Post[]
  roles?: Roles[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.method === 'GET') {
    //Check to make sure user has a session
    const session = await unstable_getServerSession(req, res)

    //If you have a session, proceed with check.
    if (session) {
      //Get user from database
      const user = await prisma.users.findUnique({
        where: {
          email: session.user?.email
        },
        include: {
          posts: {
            orderBy: { id: 'desc' },
            include: {
              comments: {
                include: {
                  users: {
                    select: {
                      name: true,
                      picture: true
                    }
                  }
                }
              }
            }
          },
          instruments: true,
          roles: true
        }
      })

      //If there is a user & is in any bands, reset roles array to band name and id objects
      if (user) {
        if (user.roles.length > 0) {
          for (let i = 0; i < user.roles.length; i++) {
            const bandNames = await prisma.bands.findUnique({
              where: {
                id: user.roles[i].bandId
              }
            })
            if (bandNames) {
              user.roles[i] = {
                name: bandNames.name,
                id: bandNames.id,
                image: bandNames.image
              }
            }
          }
        }
        ;(BigInt.prototype as any).toJSON = function () {
          return Number(this)
        }
        // console.log(result)
        // user.posts[0].date = Number(user.posts[0].date)
        return res.status(200).json(user)
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }

  //check to see if request method is put
  if (req.method === 'PUT') {
    const session = await unstable_getServerSession(req, res)
    if (session) {
      //If request body has instruments, we will update the corresponding user and update their instruments
      if (req.body.instruments) {
        let updateInst: User
        updateInst = await prisma.users.update({
          where: {
            email: session.user?.email
          },
          data: {
            instruments: {
              create: {
                instrument: req.body.instruments
              }
            }
          }
        })
        return res.status(200).json(updateInst)
      }

      //If request body has picture, bio, or name we will update the corresponding user and update their info
      const update = async (key: string) => {
        let updateData = {}

        //switch statement to set updateData based on what key is in request.body
        switch (key) {
          case 'picture':
            updateData = {
              picture: req.body.picture
            }
            break
          case 'bio':
            updateData = {
              bio: req.body.bio
            }
            break
          case 'name':
            updateData = {
              name: req.body.name
            }
            break
        }
        //update correspoinding record
        let insert = await prisma.users.updateMany({
          where: {
            email: session.user?.email as string
          },
          data: updateData
        })
        return insert.count === 1
          ? res.status(200).json({ message: true })
          : res.status(500).json({ message: false })
      }

      //Grab keys from the request.body
      let keys = Object.keys(req.body)

      //Call update function to begin update process
      return await update(keys[0])
    } else {
      //if there is no session, return unauthorized
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}
