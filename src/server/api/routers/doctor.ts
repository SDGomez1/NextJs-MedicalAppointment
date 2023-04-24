import { router, publicProcedure, protectedProcedure } from "@trpcApi/trpc";
import { z } from "zod";

export const doctorRouter = router({
	updateFirstLogin: protectedProcedure
		.input(
			z.object({
				dayOfTheWeek: z.string(),
				startTime: z.string(),
				endTime: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const sessionEmail = ctx.session.user.email;
			if (sessionEmail) {
				await ctx.prisma.user.update({
					where: {
						email: sessionEmail,
					},
					data: {
						firstLogin: false,
					},
				});
				return await ctx.prisma.doctor.create({
					data: {
						dayOfTheWeek: input.dayOfTheWeek,
						startTime: input.startTime,
						endTime: input.startTime,
						User: {
							connect: {
								email: sessionEmail,
							},
						},
					},
				});
			}
		}),
});
