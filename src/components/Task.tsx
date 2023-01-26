import { ReactElement } from "react";
import { Check, Close } from "@mui/icons-material";

type Props = {
  task: {
    id: number;
    task: string;
    done: boolean;
  };
};

export const Task = ({ task }: Props): ReactElement => {
  return (
    <tr>
      <td>{task.id}.</td>
      <td>{task.task}</td>
      <td>{task.done ? <Check /> : <Close />}</td>
    </tr>
  );
};
