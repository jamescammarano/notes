import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany();
  }),
  create: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.task.create({ data: { task: input } });
  }),
});
