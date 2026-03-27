import Credentials from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import globalEnv from '@repo/env';

type MeResponse = {
  sub: string;
  email: string;
  organizationId: string | null;
  role: string | null;
};

type LoginResponse = {
  access_token?: string;
};

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }
        const apiUrl = globalEnv.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error('NEXT_PUBLIC_API_URL is not configured');
        }

        try {
          const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const loginBody = (await response
            .json()
            .catch(() => null)) as LoginResponse | null;
          const setCookie = response.headers.get('set-cookie') ?? '';
          const cookieTokenMatch = setCookie.match(/CMS_ACCESS_TOKEN=([^;]+)/);
          const authToken = loginBody?.access_token ?? cookieTokenMatch?.[1];

          if (!authToken) {
            return null;
          }

          const meResponse = await fetch(`${apiUrl}/auth/me`, {
            method: 'GET',
            headers: {
              Cookie: `CMS_ACCESS_TOKEN=${authToken}`,
            },
          });

          if (!meResponse.ok) {
            return null;
          }

          const me = (await meResponse.json()) as MeResponse;

          return {
            id: me.sub,
            name: me.email,
            email: me.email,
            organizationId: me.organizationId,
            role: me.role,
            accessToken: authToken,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.organizationId = (
          user as { organizationId?: string | null }
        ).organizationId;
        token.role = (user as { role?: string | null }).role;
        token.accessToken = (user as { accessToken?: string }).accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? session.user.email;
      }

      (session as { accessToken?: string }).accessToken = token.accessToken as
        | string
        | undefined;
      (
        session as {
          user: {
            id?: string;
            organizationId?: string | null;
            role?: string | null;
          };
        }
      ).user.id = token.sub;
      (
        session as {
          user: {
            id?: string;
            organizationId?: string | null;
            role?: string | null;
          };
        }
      ).user.organizationId =
        (token.organizationId as string | null | undefined) ?? null;
      (
        session as {
          user: {
            id?: string;
            organizationId?: string | null;
            role?: string | null;
          };
        }
      ).user.role = (token.role as string | null | undefined) ?? null;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 1 día
    updateAge: 60 * 60 * 20, // 20 horas
  },
};
