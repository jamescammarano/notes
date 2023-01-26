import { ReactElement } from "react";

type Props = {
  index: number;
  task: {
    task: string;
    done: boolean;
  };
};

export const Task = ({ task, index }: Props): ReactElement => {
  return (
    <tr>
      <td>{index + 1}.</td>
      <td>{task.task}</td>
      <td>
        <input type="checkbox" checked={task.done} />
      </td>
    </tr>
  );
};
