import { type NextPage } from "next";
import Head from "next/head";
import { AddTask } from "../components/AddTask";
import { Header } from "../components/Header";
import { Task } from "../components/Task";

const BedtimeRoutine: NextPage = () => {
  const tasks = [{ task: "Journal", done: true }].map((task, index) => {
    return <Task key={index} task={task} index={index} />;
  });

  return (
    <>
      <Head>
        <title>Nightlite</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-foreground text-inverted">
        <Header title="Bedtime Routine" />
        <table className="mx-auto my-16 w-1/2">
          <thead className="border-b-[1px] border-muted text-left text-muted">
            <th>#</th> <th>Task</th> <th>Done</th>
          </thead>
          <tbody>{tasks}</tbody>
        </table>
        <div>
          <h2 className="text-2xl">Add Task</h2>
          <p className="text-muted">New bedtime routine?</p>
          <AddTask />
        </div>
      </main>
    </>
  );
};

export default BedtimeRoutine;
