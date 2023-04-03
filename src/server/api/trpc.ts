import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { Session } from "next-auth";

import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

import { initTRPC, TRPCError } from "@trpc/server";

type CreateContextOptions = {
	session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
	return {
		session: opts.session,
		prisma,
	};
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
	const { req, res } = opts;

	const session = await getServerAuthSession({ req, res });

	return createInnerTRPCContext({
		session,
	});
};

const t = initTRPC.context<typeof createInnerTRPCContext>().create({});

export const router = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
	if (!ctx.session || !ctx.session.user) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return next({
		ctx: {
			session: { ...ctx.session, user: ctx.session.user },
		},
	});
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
