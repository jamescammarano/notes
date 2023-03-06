import { z } from "zod";

export const TaskSchema = z.object({
  id: z.number(),
  name: z.string().min(1, {
    message: "Task item must be filled out",
  }),
  isFinished: z.boolean(),
  user_created: z.string(),
  routineId: z.string(),
});

export const unsavedTaskSchema = TaskSchema.omit({
  id: true,
  isFinished: true,
  user_created: true,
});

export const updateTaskSchema = TaskSchema.omit({
  name: true,
  user_created: true,
});

export const RoutineSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Routine title item must be filled out",
  }),
  image: z.string(),
  inverted_color: z.string(),
  dominant_color: z.string(),
  tasks: TaskSchema,
  description: z.string(),
  user_created: z.string(),
  details: z.boolean(),
});

export const unsavedRoutineSchema = RoutineSchema.omit({
  id: true,
  tasks: true,
  user_created: true,
  details: true,
  inverted_color: true,
  dominant_color: true,
  image: true,
  description: true,
});

export const updateRoutineSchema = RoutineSchema.omit({
  tasks: true,
  user_created: true,
});
