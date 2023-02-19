import type { FormEvent } from "react";
import { useState } from "react";
import { unsavedTaskSchema } from "../schemas/todo";
import { api } from "../utils/api";

type Props = {
  refetch: () => Promise<unknown>;
  routineId: string;
};

export const AddTask = ({ refetch, routineId }: Props) => {
  const [unsavedTask, setUnsavedTask] = useState("");

  const { mutateAsync: createTask } = api.todo.createTask.useMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (unsavedTask !== "") {
      const parseResults = unsavedTaskSchema.safeParse({
        name: unsavedTask,
        routineId: routineId,
      });
      if (parseResults.success) {
        try {
          await createTask({
            name: parseResults.data.name,
            routineId: routineId,
          });
          setUnsavedTask("");
          await refetch();
        } catch (error) {
          console.log(error);
          //  TODO Error handling
        }
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
          value={unsavedTask}
          onChange={(e) => setUnsavedTask(e.target.value)}
        />
        <button className="btn-primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
