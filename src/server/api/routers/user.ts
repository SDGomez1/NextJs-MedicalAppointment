import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "@trpcApi/trpc";

export const userRouter = router({
	addRole: protectedProcedure
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
	addPhoneNumber: protectedProcedure
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
	addDateOfBirth: protectedProcedure
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
