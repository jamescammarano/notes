import { type NextPage } from "next";
import Head from "next/head";
import { Sidebar } from "../../../components/layout/Sidebar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RoutineContext } from "../../../context/Routine.context";
import { useContext } from "react";

const Routine: NextPage = () => {
  const session = useSession();
  const { routines } = useContext(RoutineContext);
  const user = session.data?.user?.id;

  return (
    <>
      <Head>
        <title>Nightlite: Bedtime Routines</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-foreground text-inverted">
        <div className="flex">
          <Sidebar />
          <div className="w-4/5">
            <div className="flex h-16 w-full bg-muted p-2 text-4xl font-extrabold tracking-tight text-foreground">
              <h1 className="ml-4 ">Bedtime Routines</h1>
            </div>
            <div className="flex">
              {routines &&
                user &&
                routines.map((routine) => {
                  return (
                    <div
                      className="m-2 w-52 rounded bg-gray-600 bg-opacity-70 p-3 text-center"
                      key={routine.id}
                    >
                      <Link href={`/user/${user}/routine/${routine.id}`}>
                        <img
                          className="mb-2 rounded-full border-4 border-white bg-primary bg-opacity-70 p-2"
                          alt={routine.title}
                          src={routine.image}
                        />
                        {routine.title}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Routine;
