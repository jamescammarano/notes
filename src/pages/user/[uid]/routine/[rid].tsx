import { type NextPage } from "next";
import Head from "next/head";
import { AddTask } from "../../../../components/AddTask";
import { Header } from "../../../../components/layout/Header";
import { TaskList } from "../../../../components/TaskList";
import { api } from "../../../../utils/api";
import { useRouter } from "next/router";
import { Sidebar } from "../../../../components/layout/Sidebar";
import { useEffect, useRef, useState } from "react";
import { unsavedTodoSchema, updateTodoSchema } from "../../../../schemas/todo";
import type { Task } from "@prisma/client";

const Routine: NextPage = () => {
  const router = useRouter();
  const { rid } = router.query;
  const [newTask, setNewTask] = useState("");
  const [idOfTaskToBeUpdated, setIdOfTaskToBeUpdated] = useState(NaN);
  const routineId = useRef("");

  const { data, refetch } = api.todo.getAllTasks.useQuery(routineId.current);

  useEffect(() => {
    async function refetchQuery() {
      if (rid && !Array.isArray(rid)) {
        routineId.current = rid;
        await refetch();
      }
    }
    void refetchQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rid]);

  async function triggerRefetch() {
    await refetch();
  }
  const { mutateAsync: createTask } = api.todo.createTask.useMutation();
  const { mutateAsync: updateTask } = api.todo.update.useMutation();

  useEffect(() => {
    async function submitNewTask() {
      if (newTask !== "") {
        const parseResults = unsavedTodoSchema.safeParse({
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
    void submitNewTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTask]);

  useEffect(() => {
    const toggleDone = async () => {
      let task;
      if (!Number.isNaN(idOfTaskToBeUpdated) && data) {
        task = data[idOfTaskToBeUpdated] as Task;
      }
      if (task) {
        const parseResults = updateTodoSchema.safeParse({
          id: task.id,
          done: !task.done,
          routineId: routineId.current,
        });
        console.log(parseResults);
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
            <Header title="My Routine #1" />
            <div className="px-8">
              {data && (
                <TaskList
                  setIdOfTaskToBeUpdated={setIdOfTaskToBeUpdated}
                  tasks={data || [{ id: 0, task: "test", done: false }]}
                />
              )}
              <div>
                <h2 className="text-2xl">Add Habit</h2>
                <p className="my-2 text-muted">
                  Trying to include a new habit in your routine?
                </p>
                <AddTask
                  newTask={newTask}
                  setNewTask={setNewTask}
                  triggerRefetch={triggerRefetch}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Routine;
