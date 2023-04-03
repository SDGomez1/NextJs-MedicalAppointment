import { router } from "@trpcApi/trpc";
import { exampleRouter } from "@routers/example";
import { userRouter } from "@routers/user";

export const appRouter = router({
	example: exampleRouter,
	user: userRouter,
});

export type AppRouter = typeof appRouter;
