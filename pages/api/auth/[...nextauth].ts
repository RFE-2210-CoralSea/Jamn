import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '../../../lib/Prisma'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async redirect() {
      return '/personal'
    },
    async signIn({ user, account }) {
      // user is equivalent to session object, with an id
      console.log('user', user)

      if (account?.provider === 'google') {
        // check if user exists
        let dbUser = await prisma.users.findFirst({
          where: {
            email: user.email as string
          }
        })

        // create user in DB if a new user logs in
        if (!dbUser) {
          dbUser = await prisma.users.create({
            data: {
              picture: user.image as string,
              email: user.email as string,
              name: user.name as string,
              bio: 'Aspiring musician'
            }
          })
        }

        console.log('db user', dbUser)
        return true
      }
      return false
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(
        credentials: Record<'username' | 'password', string> | undefined
      ) {
        /**
         * This function returns a user object or null
         * It should check the password against the hashed DB pass
         * If the credentials are valid, return a User object for the session
         */

        // example user object
        if (credentials) {
          return {
            id: 'random_id',
            name: credentials.username
          }
        }

        return null
      }
    })
  ]
}

export default NextAuth(authOptions)
