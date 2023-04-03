import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@trpcApi/root";
import { createTRPCContext } from "@trpcApi/trpc";
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: createTRPCContext,
});
