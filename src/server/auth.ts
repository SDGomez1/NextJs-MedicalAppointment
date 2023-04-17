import {
	getServerSession,
	type NextAuthOptions,
	type DefaultSession,
} from "next-auth";

import type { GetServerSidePropsContext } from "next";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/db";

import bcrypt from "bcrypt";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}

export const authOptions: NextAuthOptions = {
	/* callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id == user.id;
			}
			return session;
		},
	}, */
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: "/auth/login",
	},
	providers: [
		/* GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}), */
		CredentialsProvider({
			name: "",
			credentials: {
				username: {
					label: "Email",
					type: "text",
					placeholder: "example@example.com",
				},
				password: { label: "Contraseña", type: "password" },
			},
			async authorize(credentials, req) {
				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.username,
					},
				});
				if (user && credentials?.password && user.password) {
					const isCorrect = bcrypt.compareSync(
						credentials.password,
						user.password
					);
					if (isCorrect) {
						return user;
					}
				}
				return null;
			},
		}),
	],
};

export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
