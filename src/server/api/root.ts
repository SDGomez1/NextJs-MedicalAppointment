import { router } from "@trpcApi/trpc";

import { userRouter } from "@routers/user";
import { doctorRouter } from "./routers/doctor";
import { officeRouter } from "./routers/office";

export const appRouter = router({
	user: userRouter,
	doctor: doctorRouter,
	office: officeRouter,
});

export type AppRouter = typeof appRouter;
