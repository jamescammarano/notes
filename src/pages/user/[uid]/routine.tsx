import { type NextPage } from "next";
import Head from "next/head";
import { Header } from "../../../components/layout/Header";
import { Sidebar } from "../../../components/layout/Sidebar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RoutineContext } from "../../../context/Routine.context";
import { useContext } from "react";

const Routine: NextPage = () => {
  const session = useSession();
  const { routines } = useContext(RoutineContext);

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
            {routines &&
              routines.map((routine) => {
                return (
                  <div key={routine.id}>
                    <Link
                      href={`/user/${session.data?.user?.id}/routine/${routine.id}`}
                    >
                      {routine.title}
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
