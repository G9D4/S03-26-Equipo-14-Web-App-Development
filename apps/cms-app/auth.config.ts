import Credentials from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

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
        // Implementar lógica de autenticación con el backend
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // llamada al backend para verificar credenciales
        try {
          // const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
          // const response = await fetch(`${apiUrl}/auth/login`, {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     email: credentials.email,
          //     password: credentials.password,
          //   }),
          // });

          // if (!response.ok) {
          //   throw new Error("Invalid credentials");
          // }

          // const user = await response.json();
          return {
            id: '1',
            name: 'Admin User',
            email: credentials.email,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
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
