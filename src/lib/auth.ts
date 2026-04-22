/**
 * MIDDLEPARK PROPERTIES — NEXTAUTH CONFIGURATION
 * ================================================
 * Credentials provider + Google OAuth wired to the live backend API.
 * The backend's accessToken is stored in the JWT and exposed
 * on the session so portal pages can make authenticated calls.
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'
import { loginUser, googleLogin } from './api'

const authConfig: NextAuthConfig = {
  providers: [
    // ─── Google OAuth ──────────────────────────────────────────────────────
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ─── Credentials (email/password via backend API) ──────────────────────
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const res = await loginUser({
            email: credentials.email as string,
            password: credentials.password as string,
          })

          if (!res.success || !res.data || !(res.data as any).user) return null

          const { user, accessToken, refreshToken } = res.data as any
          const { id, firstName, lastName, email, role } = user

          return {
            id,
            name: `${firstName} ${lastName}`,
            email,
            role,
            firstName,
            lastName,
            // Store tokens in the user object so JWT callback can access them
            accessToken,
            refreshToken,
          } as any
        } catch {
          // Invalid credentials or network error — NextAuth shows error page
          return null
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    newUser: '/register',
    error: '/login',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPortal = nextUrl.pathname.startsWith('/portal')

      if (isPortal) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to /login
      }

      return true
    },

    async jwt({ token, user, account }) {
      // For Credentials login: user object is passed on first sign-in
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.name = (user as any).name
        token.firstName = (user as any).firstName
        token.lastName = (user as any).lastName
        token.accessToken = (user as any).accessToken
        token.refreshToken = (user as any).refreshToken
      }

      // For Google sign-in: exchange Google ID token for backend JWT
      if (account?.provider === 'google' && account.id_token) {
        try {
          const res = await googleLogin(account.id_token)
          const u: any = (res as any)?.data?.user
          if (res.success && u) {
            token.id = u.id
            token.role = u.role
            token.firstName = u.firstName
            token.lastName = u.lastName
            token.name = `${u.firstName} ${u.lastName}`
            token.accessToken = (res as any).data.accessToken
            token.refreshToken = (res as any).data.refreshToken
            token.provider = 'google'
          }
        } catch (error) {
          console.error('Backend Google OAuth exchange failed:', error)
        }
      }

      return token
    },

    // Expose accessToken on the session so pages can use it for API calls
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = (token.name as string) || session.user.name
        ;(session.user as any).role = token.role
        ;(session.user as any).firstName = (token as any).firstName
        ;(session.user as any).lastName = (token as any).lastName
        ;(session as any).accessToken = token.accessToken
        ;(session as any).provider = token.provider
      }
      return session
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET || 'middlepark-website-nextauth-secret-2026',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
