import { type NextPage } from "next";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import Link from "next/link";
import { RoutineContext } from "../context/Routine.context";
import { useContext } from "react";
import Image from "next/image";

const Routine: NextPage = () => {
  const { routines } = useContext(RoutineContext);

  return (
    <>
      <Head>
        <title>Nightlite: Bedtime Routines</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-background-400 text-inverted">
        <div className="flex">
          <Sidebar />
          <div className="w-4/5">
            <div className="flex flex-wrap">
              {routines &&
                routines.map((routine) => {
                  return (
                    <div
                      className="m-2 w-52 rounded bg-gray-600 bg-opacity-70 p-3 text-center"
                      key={routine.id}
                    >
                      <Link href={`/routines/${routine.id}`}>
                        <Image
                          className="mb-2 rounded border-4 border-white bg-opacity-70"
                          style={{ background: routine.inverted_color }}
                          alt={routine.title}
                          width={240}
                          height={240}
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
