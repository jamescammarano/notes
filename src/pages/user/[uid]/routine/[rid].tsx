import { type NextPage } from "next";
import Head from "next/head";
import { AddTask } from "../../../../components/AddTask";
import { Header } from "../../../../components/layout/Header";
import { TaskList } from "../../../../components/TaskList";
import { api } from "../../../../utils/api";
import { useRouter } from "next/router";
import { Sidebar } from "../../../../components/layout/Sidebar";

const Routine: NextPage = () => {
  const router = useRouter();
  const { rid } = router.query;

  let query;
  if (rid) {
    query = api.todo.getAllTasks.useQuery(rid);
  }

  async function triggerRefetch() {
    await query.refetch();
  }

  return (
    <>
      <Head>
        <title>Nightlite: Bedtime Routine</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-foreground text-inverted">
        <div className="flex">
          <Sidebar />
          <div>
            <Header title="My Routine #1" />
            {query?.data && (
              <TaskList
                triggerRefetch={triggerRefetch}
                tasks={query?.data || []}
              />
            )}
            <div className="px-8">
              <h2 className="text-2xl">Add Habit</h2>
              <p className="my-2 text-muted">
                Trying to include a new habit in your routine?
              </p>
              <AddTask triggerRefetch={triggerRefetch} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Routine;
