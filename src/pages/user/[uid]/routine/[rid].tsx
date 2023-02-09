import { type NextPage } from "next";
import Head from "next/head";
import { AddTask } from "../../../../components/AddTask";
import { Header } from "../../../../components/Header";
import { TaskList } from "../../../../components/TaskList";
import { api } from "../../../../utils/api";
import { useRouter } from "next/router";
import { Sidebar } from "../../../../components/layout/Sidebar";
import { useEffect, useRef, useState } from "react";
import { unsavedTaskSchema, updateTaskSchema } from "../../../../schemas/todo";
import { type RoutineWithTasks } from "../../../../types/prisma-union";

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
    tasks: [{ id: 0, task: "", done: false }],
  });
  const [newTask, setNewTask] = useState("");
  const [idOfTaskToBeUpdated, setIdOfTaskToBeUpdated] = useState(NaN);
  const [routineId, setRoutineId] = useState("");

  const { data, refetch } = api.todo.getRoutine.useQuery(routineId);

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

  const { mutateAsync: createTask } = api.todo.createTask.useMutation();
  const { mutateAsync: updateTask } = api.todo.updateTask.useMutation();

  useEffect(() => {
    async function submitNewTask() {
      if (newTask !== "") {
        const parseResults = unsavedTaskSchema.safeParse({
          task: newTask,
          routineId: routineId,
        });
        if (parseResults.success) {
          try {
            await createTask({
              task: parseResults.data.task,
              routineId: routineId,
            });
            setNewTask("");
            await refetch();
          } catch (error) {
            console.log(error);
            //  TODO Error handling
          }
        }
      }
    }
    void submitNewTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTask]);

  useEffect(() => {
    const toggleDone = async () => {
      let task;
      if (!Number.isNaN(idOfTaskToBeUpdated) && data?.tasks) {
        task = data.tasks.filter((task) => task.id === idOfTaskToBeUpdated)[0];
      }
      if (task) {
        const parseResults = updateTaskSchema.safeParse({
          id: task.id,
          done: !task.done,
          routineId: routineId,
        });
        if (parseResults.success) {
          try {
            await updateTask({
              id: task.id,
              done: !task.done,
              routineId: routineId,
            });
          } catch (error) {
            //  TODO Error handling
          }
        }
      }
    };
    void toggleDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idOfTaskToBeUpdated]);

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
              {data && (
                <TaskList
                  setIdOfTaskToBeUpdated={setIdOfTaskToBeUpdated}
                  tasks={routine.tasks}
                />
              )}
              <div>
                <h2 className="text-2xl">Add Habit</h2>
                <p className="my-2 text-muted">
                  Trying to include a new habit in your routine?
                </p>
                <AddTask newTask={newTask} setNewTask={setNewTask} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RoutinePage;
