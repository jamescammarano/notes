import { z } from "zod";
import { getAverageColor } from "fast-average-color-node";
import { generateImageURL } from "../../../utils/image-tools";
import invert from "invert-color";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getAllTasks: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.task.findMany({
      where: { user_created: ctx.session.user.id, routineId: input },
    });
  }),
  getAllRoutines: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.routine.findMany({
      where: { user_created: ctx.session.user.id },
      include: { tasks: true },
    });
  }),
  getRoutine: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.routine.findFirst({
      where: { user_created: ctx.session.user.id, id: input },
      select: {
        id: true,
        title: true,
        image: true,
        description: true,
        dominant_color: true,
        inverted_color: true,
        tasks: {
          select: {
            name: true,
            id: true,
            isFinished: true,
          },
        },
      },
    });
  }),
  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        isFinished: z.boolean(),
        routineId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: { id: input.id },
        data: {
          isFinished: input.isFinished,
          routineId: input.routineId,
        },
      });
    }),
  updateRoutine: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const colors = await getBackgroundColors(input.image);

      return ctx.prisma.routine.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          image: input.image,
          inverted_color: colors?.invertedColor || "",
          dominant_color: colors?.dominantColor || "",
        },
      });
    }),
  createTask: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        routineId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          name: input.name,
          user_created: ctx.session.user.id,
          routineId: input.routineId,
        },
      });
    }),
  createRoutine: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user.id;
      const imageUrl = generateImageURL(user, input.title);
      const colors = await getBackgroundColors(imageUrl);
      return ctx.prisma.routine.create({
        data: {
          title: input.title,
          user_created: user,
          dominant_color: colors?.dominantColor || "",
          inverted_color: colors?.invertedColor || "",
          image: imageUrl,
        },
      });
    }),
  getInvertedColor: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const colors = await getBackgroundColors(input);
      return colors?.invertedColor || "#000";
    }),
});

async function getBackgroundColors(url: string) {
  try {
    const dominantColor = (await getAverageColor(url)).hex;
    const invertedColor = invert(dominantColor);
    return { dominantColor, invertedColor };
  } catch (err) {
    // TODO handle errors
    console.log(err);
  }
}
