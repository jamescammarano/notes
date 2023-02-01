import type { FormEvent } from "react";
import { useState } from "react";
import { unsavedTodoSchema } from "../schemas/todo";
import { api } from "../utils/api";

type Props = {
  triggerRefetch: () => Promise<void>;
};

export const AddTask = ({ triggerRefetch }: Props) => {
  const [task, setTask] = useState("");
  const [error, SetError] = useState("");

  const { mutateAsync } = api.todo.createTask.useMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parseResults = unsavedTodoSchema.safeParse({ task });
    if (parseResults.success) {
      try {
        await mutateAsync({ task: parseResults.data.task });
        setTask("");
        await triggerRefetch();
      } catch (error) {
        //  TODO Error handling
      }
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
        <button className="btn-primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
