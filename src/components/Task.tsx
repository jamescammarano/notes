import type { ReactElement } from "react";
import { Check, CheckBoxOutlineBlank } from "@mui/icons-material";
import { updateTodoSchema } from "../schemas/todo";
import { api } from "../utils/api";

type Props = {
  task: {
    id: number;
    task: string;
    done: boolean;
  };
  triggerRefetch: () => Promise<void>;
};

export const Task = ({ task, triggerRefetch }: Props): ReactElement => {
  const { mutateAsync } = api.todo.update.useMutation();

  const toggleDone = async () => {
    const parseResults = updateTodoSchema.safeParse({
      id: task.id,
      done: !task.done,
    });

    if (parseResults.success) {
      try {
        await mutateAsync({ id: task.id, done: !task.done });
        await triggerRefetch();
      } catch (error) {
        //  TODO Error handling
      }
    }
  };

  return (
    <tr>
      <td>{task.id}.</td>
      <td>{task.task}</td>
      <td>
        <button onClick={() => void toggleDone()}>
          {task.done ? <Check /> : <CheckBoxOutlineBlank />}
        </button>
      </td>
    </tr>
  );
};
