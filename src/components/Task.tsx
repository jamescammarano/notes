import type { Dispatch, ReactElement, SetStateAction } from "react";
import { Check, CheckBoxOutlineBlank } from "@mui/icons-material";

type Props = {
  setIdOfTaskToBeUpdated: Dispatch<SetStateAction<number>>;
  task: {
    id: number;
    task: string;
    done: boolean;
  };
};

export const Task = ({ task, setIdOfTaskToBeUpdated }: Props): ReactElement => {
  return (
    <tr>
      <td>{task.id}.</td>
      <td>{task.task}</td>
      <td>
        <button onClick={() => setIdOfTaskToBeUpdated(task.id)}>
          {task.done ? <Check /> : <CheckBoxOutlineBlank />}
        </button>
      </td>
    </tr>
  );
};
