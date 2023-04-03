import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "@trpcApi/trpc";

export const exampleRouter = router({
	getsecretMessage: protectedProcedure.query(() => {
		return "Este mesaje solo se muestra si esta autenticado";
	}),
	getEmail: protectedProcedure.query(({ ctx }) => {
		return ctx.session.user.email;
	}),
});
