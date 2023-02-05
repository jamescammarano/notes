import { z } from "zod";

export const TaskSchema = z.object({
  id: z.number(),
  task: z.string().min(1, {
    message: "Task item must be filled out",
  }),
  done: z.boolean(),
  user_created: z.string(),
  routineId: z.string(),
});

export const unsavedTaskSchema = TaskSchema.omit({
  id: true,
  done: true,
  user_created: true,
});

export const updateTaskSchema = TaskSchema.omit({
  task: true,
  user_created: true,
});

export const RoutineSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Routine title item must be filled out",
  }),
  image: z.string(),
  tasks: TaskSchema,
  description: z.string(),
  user_created: z.string(),
});

export const unsavedRoutineSchema = RoutineSchema.omit({
  id: true,
  tasks: true,
  user_created: true,
  details: true,
});

export const updateRoutineSchema = RoutineSchema.omit({
  tasks: true,
  user_created: true,
});
