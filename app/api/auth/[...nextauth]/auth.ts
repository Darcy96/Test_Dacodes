import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',  //custom login page
	},
	callbacks: {
		async redirect() {
			// Redirect to /transfers after a successful login
			return '/transfers'
		},
	},
};

export default NextAuth(authOptions);
