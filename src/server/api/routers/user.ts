import { router, publicProcedure, protectedProcedure } from "@trpcApi/trpc";

import { z } from "zod";

import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
	create: publicProcedure
		.input(
			z.object({
				name: z.string(),
				email: z.string(),
				password: z.string(),
				isDoctor: z.boolean(),
				phoneNumber: z.number(),
				DOB: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const password = await bcrypt.hash(input.password, 10);
				return await ctx.prisma.user.create({
					data: {
						name: input.name,
						email: input.email,
						isDoctor: input.isDoctor,
						phoneNumber: input.phoneNumber,
						dateOfBirth: new Date(input.DOB),
						password: password,
					},
				});
			} catch (e) {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					if (e.code === "P2002") {
						throw new TRPCError({
							code: "BAD_REQUEST",
						});
					}
				}
				throw e;
			}
		}),

	updateRole: protectedProcedure
		.input(
			z.object({
				data: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const sessionEmail = ctx.session.user.email;
			if (sessionEmail) {
				return ctx.prisma.user.update({
					where: {
						email: sessionEmail,
					},
					data: {
						isDoctor: input.data == "true" ? true : false,
					},
				});
			}
		}),
	updatePhoneNumber: protectedProcedure
		.input(
			z.object({
				data: z.number(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const sessionEmail = ctx.session.user.email;
			if (sessionEmail) {
				return ctx.prisma.user.update({
					where: {
						email: sessionEmail,
					},
					data: {
						phoneNumber: input.data,
					},
				});
			}
		}),
	updateDateOfBirth: protectedProcedure
		.input(
			z.object({
				data: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const sessionEmail = ctx.session.user.email;
			if (sessionEmail) {
				return ctx.prisma.user.update({
					where: {
						email: sessionEmail,
					},
					data: {
						dateOfBirth: input.data,
					},
				});
			}
		}),
});
