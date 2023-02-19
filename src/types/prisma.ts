import { Prisma } from "@prisma/client";

const routineWithTasks = Prisma.validator<Prisma.RoutineArgs>()({
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

export type RoutineWithTasks = Prisma.RoutineGetPayload<
  typeof routineWithTasks
>;
