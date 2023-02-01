import type { ReactElement } from "react";
import { Task } from "./Task";

type Props = {
  tasks:
    | {
        id: number;
        task: string;
        done: boolean;
      }[];
  triggerRefetch: () => Promise<void>;
};

export const TaskList = ({ tasks, triggerRefetch }: Props): ReactElement => {
  return (
    <table className=" my-16">
      <tbody>
        <tr className="border-b-[1px] border-muted text-left text-muted">
          <th>#</th> <th>Habit</th> <th>Done</th>
        </tr>
        {tasks?.map((task) => {
          return (
            <Task key={task.id} triggerRefetch={triggerRefetch} task={task} />
          );
        })}
      </tbody>
    </table>
  );
};
