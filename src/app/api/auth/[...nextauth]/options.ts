import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from 'next-auth/providers/github'
const options: NextAuthOptions = {
    pages: {
        signIn: '/',
    },
    providers: [

        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            id: 'credential',
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter your username" },
                password: { label: "Password", type: "password", placeholder: 'Enter your Password' }
            },
            async authorize(credentials) {
                const userDetails = { username: 'admin', password: "admin" }
                if (credentials?.username == userDetails.username && credentials?.password == userDetails.password) {
                    console.log('credentials', credentials);
                    return JSON.parse(JSON.stringify(userDetails))
                } else {
                    return null
                }
            },
        })
    ],
    callbacks: {
        async session({ session }) {
            return session
        },
        async jwt({ token }) {
            return token
        }
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET as string
}

export default options