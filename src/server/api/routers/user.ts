import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "@trpcApi/trpc";
import bcrypt from "bcrypt";
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
			const password = await bcrypt.hash(input.password, 10);
			return await ctx.prisma.user.create({
				data: {
					name: input.name,
					email: input.email,
					IsDoctor: input.isDoctor,
					phoneNumber: input.phoneNumber,
					dateOfBirth: input.DOB,
					Password: password,
				},
			});
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
						IsDoctor: input.data == "true" ? true : false,
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
