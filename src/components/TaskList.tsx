import type { ReactElement } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { type } from "os";
import { Task } from "./Task";

type Props = {
  tasks:
    | {
        id: number;
        task: string;
        done: boolean;
      }[]
    | undefined;
};
export const TaskList = ({ tasks }: Props): ReactElement => {
  return (
    <table className="mx-auto my-16 w-1/2">
      <tbody>
        <tr className="border-b-[1px] border-muted text-left text-muted">
          <th>#</th> <th>Habit</th> <th>Done</th>
        </tr>
        {tasks?.map((task, index) => {
          return <Task key={index} task={task} />;
        })}
      </tbody>
    </table>
  );
};
