import { router, publicProcedure, protectedProcedure } from "@trpcApi/trpc";
import { z } from "zod";

export const doctorRouter = router({
  updateFirstLogin: protectedProcedure
    .input(
      z.object({
        dayOfTheWeek: z.string(),
        startTime: z.string(),
        endTime: z.string(),
		name: z.string(),

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
		const inputOfficeId = await ctx.prisma.office.findUnique({
			where: {
			  name: input.name,
			},
		});
		
        return await ctx.prisma.doctor.create({
          data: {
            dayOfTheWeek: new Date(input.dayOfTheWeek),
            startTime: new Date(input.startTime),
            endTime: new Date(input.startTime),
            User: {
              connect: {
                email: sessionEmail,
              },
            },
			Office: {
				connect:{
					id: inputOfficeId?.id
				}
			}
          },
        });
      }
    }),
  
});
