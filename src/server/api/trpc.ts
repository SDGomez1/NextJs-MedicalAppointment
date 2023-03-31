import { initTRPC } from '@trpc/server';
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { CreateContextOptions } from "vm";
import { prisma } from "@trpcApi/db";
import { getServerSession } from 'next-auth';
const createInnerTRPCContext = (_opts: CreateContextOptions) => {

    return {
        prisma,
        getServerSession
    }
}

export const createTRPCContext = async (_opts: CreateNextContextOptions) => {
    return createInnerTRPCContext({});
}

const t = initTRPC.context<typeof createTRPCContext>().create()

export const router = t.router;
export const procedure = t.procedure;