import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number(),
  task: z.string().min(1, {
    message: "Todo item must be filled out",
  }),
  done: z.boolean(),
  user_created: z.string(),
  routineId: z.string(),
});

export const unsavedTodoSchema = TodoSchema.omit({
  id: true,
  done: true,
  user_created: true,
});

export const updateTodoSchema = TodoSchema.omit({
  task: true,
  user_created: true,
});

export const ListSchema = z.object({
  id: z.number(),
  title: z.string().min(1, {
    message: "Routine title item must be filled out",
  }),
  tasks: TodoSchema,
  user_created: z.string(),
});

export const unsavedListSchema = ListSchema.omit({
  id: true,
  tasks: true,
  user_created: true,
});
