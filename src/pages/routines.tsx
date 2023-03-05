import { type NextPage } from "next";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import Link from "next/link";
import { RoutineContext } from "../context/Routine.context";
import { useContext } from "react";
import Image from "next/image";
import { api } from "../utils/api";
import { unsavedRoutineSchema } from "../schemas/todo";
import { type RoutineWithTasks } from "../types/prisma";

type Card = {
  id: string;
  title: string;
  image: string;
  inverted_color: string;
  numberOfTasks: number;
};

const Card: React.FC<Card> = ({
  id,
  title,
  image,
  inverted_color,
  numberOfTasks,
}) => {
  return (
    <>
      <div className="my-4 rounded-md border-2 border-muted-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:p-2 md:my-0 md:py-4 lg:w-full lg:border-[1px] lg:border-t-4 lg:border-t-primary lg:p-2 lg:pt-1">
        <Link href={`/routines/${id}`}>
          <div className="text-inverted-100 flex flex-row-reverse items-center justify-end gap-4 overflow-hidden p-2 md:flex-col lg:rounded-md">
            <div className="max-w-[12rem] md:w-full">
              <h2 className="truncate text-center text-2xl sm:text-lg lg:text-2xl">
                {title}
              </h2>
              <div className="text-base text-muted-100/70 lg:hidden">
                {numberOfTasks ?? 0} tasks
              </div>
            </div>

            <div className="w-24 md:w-full lg:pt-0">
              <Image
                src={image}
                style={{ background: inverted_color }}
                alt={title}
                width={240}
                height={240}
              />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export const Cards: React.FC<{ data: RoutineWithTasks[] }> = ({ data }) => {
  const { refetch } = useContext(RoutineContext);

  const { mutateAsync } = api.todo.createRoutine.useMutation();

  const handleClick = async () => {
    const parseResults = unsavedRoutineSchema.safeParse({
      title: `My Routine #${data.length + 1}`,
    });

    if (parseResults.success) {
      try {
        await mutateAsync({ title: parseResults.data.title });
        await refetch();
      } catch (error) {
        //  TODO Error handling
      }
    }
  };
  return (
    <div className="lg:pb-12">
      <div className="mt-1 md:grid md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-8">
        <div className="splash col-span-2 hidden rounded-md sm:block md:col-span-2">
          <button
            onClick={() => void handleClick()}
            className="mx-auto flex h-full flex-row items-center md:p-2 md:text-[3.5rem] lg:text-[3.5rem]"
          >
            New Routine
          </button>
        </div>
        {data &&
          data.map((contents) => (
            <Card
              numberOfTasks={contents?.tasks.length ?? 0}
              inverted_color={contents.inverted_color}
              key={contents.id}
              id={contents.id}
              title={contents.title}
              image={contents.image}
            />
          ))}
      </div>
    </div>
  );
};

const Routine: NextPage = () => {
  const { routines } = useContext(RoutineContext);
  return (
    <>
      <Head>
        <title>Nightlite: Bedtime Routines</title>
      </Head>
      <main className="flex min-h-screen min-w-full flex-col bg-background-400 text-inverted">
        <div className="flex">
          <Sidebar />
          <div className="w-full py-8 px-8">
            <h1 className="mb-8 text-center text-4xl sm:px-0 md:text-left md:text-6xl lg:mt-12">
              Your Routines
            </h1>
            <div className="w-full">
              {routines && <Cards data={routines} />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Routine;
