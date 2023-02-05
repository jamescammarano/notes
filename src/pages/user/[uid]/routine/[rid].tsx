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
import type { Task } from "@prisma/client";
import { EditRoutineDescription } from "../../../../components/EditRoutineDescription";

const RoutinePage: NextPage = () => {
  const router = useRouter();
  const { rid } = router.query;
  const [newTask, setNewTask] = useState("");
  const [idOfTaskToBeUpdated, setIdOfTaskToBeUpdated] = useState(NaN);
  const routineId = useRef("");
  const defaultRoutine = {
    id: "",
    title: "",
    description: "",
    image: "",
    tasks: [{ id: "", task: "" }],
  };
  const { data, refetch } = api.todo.getRoutine.useQuery(routineId.current);

  useEffect(() => {
    async function refetchQuery() {
      if (rid && !Array.isArray(rid)) {
        routineId.current = rid;
        await refetch();
      }
    }
    refetchQuery();
  }, [rid]);

  const { mutateAsync: createTask } = api.todo.createTask.useMutation();
  const { mutateAsync: updateTask } = api.todo.updateTask.useMutation();

  useEffect(() => {
    async function submitNewTask() {
      if (newTask !== "") {
        const parseResults = unsavedTaskSchema.safeParse({
          task: newTask,
          routineId: routineId.current,
        });
        if (parseResults.success) {
          try {
            await createTask({
              task: parseResults.data.task,
              routineId: routineId.current,
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
    submitNewTask();
  }, [newTask]);

  useEffect(() => {
    const toggleDone = async () => {
      let task;
      if (!Number.isNaN(idOfTaskToBeUpdated)) {
        task = data?.tasks[idOfTaskToBeUpdated] as Task;
      }
      if (task) {
        const parseResults = updateTaskSchema.safeParse({
          id: task.id,
          done: !task.done,
          routineId: routineId.current,
        });
        if (parseResults.success) {
          try {
            await updateTask({
              id: task.id,
              done: !task.done,
              routineId: routineId.current,
            });
          } catch (error) {
            //  TODO Error handling
          }
        }
      }
    };
    toggleDone();
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
            <Header routine={data ?? defaultRoutine} />
            <EditRoutineDescription routine={data ?? defaultRoutine} />
            <div className="px-8">
              {data && (
                <TaskList
                  setIdOfTaskToBeUpdated={setIdOfTaskToBeUpdated}
                  tasks={data?.tasks ?? defaultRoutine.tasks}
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
