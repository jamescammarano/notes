import { type NextPage } from "next";
import Head from "next/head";
import { AddTask } from "../../../../components/AddTask";
import { Header } from "../../../../components/Header";
import { api } from "../../../../utils/api";
import { useRouter } from "next/router";
import { Sidebar } from "../../../../components/Sidebar";
import { useEffect, useState, type ReactElement } from "react";
import { unsavedTaskSchema } from "../../../../schemas/todo";
import { type RoutineWithTasks } from "../../../../types/prisma";
import { Check, CheckBoxOutlineBlank } from "@mui/icons-material";

type TaskListProps = {
  routineId: string;
  tasks:
    | {
        id: number;
        name: string;
        isFinished: boolean;
      }[];
  refetch: () => Promise<unknown>;
};

export const TaskList = ({
  tasks,
  routineId,
  refetch,
}: TaskListProps): ReactElement => {
  const { mutateAsync: updateTask } = api.todo.updateTask.useMutation();

  const updateCompletion = async (task: {
    id: number;
    name: string;
    isFinished: boolean;
  }) => {
    const parseResults = unsavedTaskSchema.safeParse({
      id: task.id,
      name: task.name,
      isFinished: task.isFinished,
      routineId: routineId,
    });
    if (parseResults.success) {
      try {
        await updateTask({
          id: task.id,
          isFinished: !task.isFinished,
          routineId: routineId,
        });
        await refetch();
      } catch (error) {
        console.log(error);
        //  TODO Error handling
      }
    }
  };

  return (
    <div>
      <div className="sticky mb-8 flex w-full gap-3 border-b-2 border-gray-600 pb-2">
        <div className="">#</div>
        <div className="w-2/3 text-left">Task</div>
        <div>Finshed</div>
      </div>
      {tasks &&
        tasks?.map((task, index) => {
          return (
            <div key={task.id} className="flex w-full gap-3 pb-3">
              <div className="">{index + 1}.</div>
              <div className="w-2/3 text-left">{task.name}</div>
              <div>
                <button onClick={() => void updateCompletion(task)}>
                  {task.isFinished ? <Check /> : <CheckBoxOutlineBlank />}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

const RoutinePage: NextPage = () => {
  const router = useRouter();
  const { rid } = router.query;
  const [routine, setRoutine] = useState<RoutineWithTasks>({
    id: "",
    title: "",
    description: "",
    inverted_color: "#000",
    dominant_color: "#fff",
    image: "",
    tasks: [{ id: 0, name: "", isFinished: false }],
  });
  const [routineId, setRoutineId] = useState("");

  const { data, refetch } = api.todo.getRoutine.useQuery(routineId, {
    enabled: rid ? true : false,
  });

  useEffect(() => {
    if (rid && !Array.isArray(rid)) {
      setRoutineId(rid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rid]);

  useEffect(() => {
    if (data && data !== null) {
      setRoutine(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Head>
        <title>Nightlite: Bedtime Routine</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-foreground text-inverted">
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            <Header routine={routine} refetch={refetch} />
            <div className="px-8">
              {data && routineId && (
                <TaskList
                  routineId={routineId}
                  tasks={routine.tasks}
                  refetch={refetch}
                />
              )}
              <div>
                <h2 className="text-2xl">Add Habit</h2>
                <p className="my-2 text-muted">
                  Trying to include a new habit in your routine?
                </p>
                <AddTask refetch={refetch} routineId={routineId} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RoutinePage;
