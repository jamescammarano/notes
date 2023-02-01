import type { Dispatch, ReactElement, SetStateAction } from "react";
import { Task } from "./Task";

type Props = {
  setIdOfTaskToBeUpdated: Dispatch<SetStateAction<number>>;
  tasks:
    | {
        id: number;
        task: string;
        done: boolean;
      }[];
};

export const TaskList = ({
  tasks,
  setIdOfTaskToBeUpdated,
}: Props): ReactElement => {
  return (
    <table className="my-16 w-full">
      <thead className="border-b-[1px] border-muted text-left text-muted">
        <th>#</th> <th>Habit</th> <th>Done</th>
      </thead>
      <tbody>
        {tasks &&
          tasks?.map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                setIdOfTaskToBeUpdated={setIdOfTaskToBeUpdated}
              />
            );
          })}
      </tbody>
    </table>
  );
};
