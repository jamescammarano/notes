import { type NextPage } from "next";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import Link from "next/link";
import { RoutineContext } from "../context/Routine.context";
import { useContext } from "react";
import Image from "next/image";
import { api } from "../utils/api";
import { unsavedRoutineSchema } from "../schemas/todo";

type Card = {
  id: string;
  title: string;
  image: string;
  inverted_color: string;
};

type Cards = {
  data: Card[];
};

const DEFAULT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=480&h=480&q=80";

const Card: React.FC<Card> = ({ id, title, image, inverted_color }) => {
  return (
    <>
      <div className="w-full rounded-md border-[1px] border-t-4 border-primary pt-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <Link href={`/routines/${id}`}>
          <div className="bg-secondary text-inverted-100 flex flex-col overflow-hidden rounded-md p-3 sm:p-6">
            <div className="justify-center">
              <h2 className="truncate text-center text-lg sm:text-lg">
                {title}
              </h2>
            </div>
            <div className="pt-4">
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

export const Cards: React.FC<Cards> = ({ data }) => {
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
    <div className="pb-12">
      <div className="mt-1 grid grid-cols-2 gap-8 md:grid-cols-4">
        <div className="splash col-span-2 rounded-md">
          <button
            onClick={() => void handleClick()}
            className="mx-auto flex h-full flex-row items-center lg:text-[3rem]"
          >
            New Routine
          </button>
        </div>
        {data.map((contents) => (
          <Card
            inverted_color={contents.inverted_color}
            key={contents.id}
            id={contents.id}
            title={contents.title}
            image={contents.image ?? DEFAULT_PLACEHOLDER}
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
          <div className="w-full px-8">
            <h1 className="mt-12 mb-8 text-4xl">Your Routines</h1>
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
