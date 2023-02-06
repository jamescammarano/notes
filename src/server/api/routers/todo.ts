import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getAllTasks: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.task.findMany({
      where: { user_created: ctx.session.user.id, routineId: input },
    });
  }),
  getAllLists: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.routine.findMany({
      where: { user_created: ctx.session.user.id },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.boolean(),
        routineId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: { id: input.id },
        data: {
          done: input.done,
          routineId: input.routineId,
        },
      });
    }),
  createTask: protectedProcedure
    .input(
      z.object({
        task: z.string(),
        routineId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          task: input.task,
          user_created: ctx.session.user.id,
          routineId: input.routineId,
        },
      });
    }),
  createList: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.routine.create({
        data: {
          title: input.title,
          user_created: ctx.session.user.id,
          image: "",
        },
      });
    }),
});
