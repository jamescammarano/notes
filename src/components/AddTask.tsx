import type { Dispatch, FormEvent, SetStateAction } from "react";
import { useState } from "react";

type Props = {
  setNewTask: Dispatch<SetStateAction<string>>;
  newTask: string;
};

export const AddTask = ({ setNewTask }: Props) => {
  const [unsavedTask, setUnsavedTask] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setNewTask(unsavedTask);
    setUnsavedTask("");
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
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
