import { type NextPage } from "next";
import Head from "next/head";
import { Header } from "../../../components/layout/Header";
import { api } from "../../../utils/api";
import { Sidebar } from "../../../components/layout/Sidebar";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Routine: NextPage = () => {
  const session = useSession();
  const { data: lists } = api.todo.getAllLists.useQuery();

  return (
    <>
      <Head>
        <title>Nightlite: Bedtime Routines</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-foreground text-inverted">
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            <Header title="Bedtime Routines" />
            {lists &&
              lists.map((list) => {
                return (
                  <div key={list.id}>
                    <Link
                      href={`/user/${session.data?.user?.id}/routine/${list.id}`}
                    >
                      {list.title}
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Routine;
