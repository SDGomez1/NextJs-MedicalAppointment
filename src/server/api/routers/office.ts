import { router, publicProcedure, protectedProcedure } from "@trpcApi/trpc";
import { z } from "zod";

export const officeRouter = router({
	getAllCities: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.office.findMany({
			distinct: ["city"],
		});
	}),
	getAllSedes: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.office.findMany({
			distinct: ["name"],
		});
	}),
	getSedesByCiudad: publicProcedure
		.input(
			z.object({
				city: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.office.findMany({
				where: {
					city: input.city,
				},
				distinct: ["name"],
			});
		}),
	getOfficeBySede: publicProcedure
		.input(
			z.object({
				sede: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			return ctx.prisma.office.findUnique({
				where: {
					name: input.sede,
				},
			});
		}),
});
