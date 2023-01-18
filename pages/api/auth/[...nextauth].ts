import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, credentials }) {
      // user is equivalent to session object, with an id
      console.log('user', user)
      // account stores provider info
      console.log('account', account)
      // may be useful for custom credentials
      console.log('credentials', credentials)

      // an account needs to be created on the DB
      if (account?.provider === 'google') {
        console.log('checking account')
      }
      return true
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
