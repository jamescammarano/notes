import type { FormEvent } from "react";
import { useState } from "react";
import { unsavedTodoSchema } from "../schemas/todo";
import { api } from "../utils/api";
// TODO send API call {task}

export const AddTask = () => {
  const [task, setTask] = useState("");
  const [error, SetError] = useState("");

  const { mutateAsync } = api.todo.create.useMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parseResults = unsavedTodoSchema.safeParse({ task });
    if (parseResults.success) {
      try {
        await mutateAsync(parseResults.data.task);
        setTask("");
      } catch (error) {
        //  TODO Error handling
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <form onSubmit={(e) => void handleSubmit(e)}>
        <label htmlFor="habit">Habit</label>
        <input
          name="habit"
          className="m-2 rounded p-1 text-foreground"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
