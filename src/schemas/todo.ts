import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  task: z.string().min(1, {
    message: "Todo item must be filled out",
  }),
  done: z.boolean(),
});

export const unsavedTodoSchema = TodoSchema.omit({ id: true, done: true });
