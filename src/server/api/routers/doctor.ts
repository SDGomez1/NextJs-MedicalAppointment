import { router, publicProcedure, protectedProcedure } from "@trpcApi/trpc";
import { z } from "zod";

export const userRouter = router({
	create: protectedProcedure
		.input(
			z.object({
				dayOfTheWeek: z.date(),
				startTime: z.date(),
				endTime: z.date(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const sessionEmail = ctx.session.user.email;
			if (sessionEmail) {
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
