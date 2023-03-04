import { Add, FormatListBulletedOutlined, Logout } from "@mui/icons-material";
import Link from "next/link";
import { type ReactElement, useContext } from "react";
import { RoutineContext } from "../context/Routine.context";
import { unsavedRoutineSchema } from "../schemas/todo";
import { api } from "../utils/api";
import Image from "next/image";
import { signOut } from "next-auth/react";

export const Sidebar = (): ReactElement => {
  const { routines, refetch } = useContext(RoutineContext);

  const { mutateAsync } = api.todo.createRoutine.useMutation();

  const handleClick = async () => {
    const parseResults = unsavedRoutineSchema.safeParse({
      title: `My Routine #${routines.length + 1}`,
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
    <div className="bg-background-400 py-4 text-muted-100 lg:min-h-screen lg:w-64 lg:border-r-[1px] lg:border-muted-300">
      <div className="fixed bottom-0 flex w-full flex-row items-center justify-between gap-2 border-t-2 border-primary bg-background-400 py-2 px-8 text-xl md:py-12 lg:relative lg:mt-8 lg:flex-col lg:items-start lg:gap-0 lg:border-t-0 lg:py-0">
        <Link href="/">
          <div className="mt-1 flex flex-col items-center gap-2 text-base tracking-tight sm:text-2xl md:flex-row md:text-4xl lg:mb-3 lg:items-start lg:text-2xl">
            <Image
              src="https://i.imgur.com/CfsgSxq.png"
              width={35}
              height={35}
              alt=""
            />
            <span className="text-muted-100">Home</span>
          </div>
        </Link>
        <Link href="/routines">
          <div className="mt-1 flex flex-col items-center text-base tracking-tight sm:text-2xl md:flex md:flex-row md:gap-2 md:text-4xl lg:mb-3 lg:items-start lg:justify-start lg:text-2xl">
            <FormatListBulletedOutlined fontSize="large" />
            <span className="text-muted-100">Routines</span>
          </div>
        </Link>
        <button
          onClick={() => void handleClick()}
          className="mt-1 flex flex-col items-center text-base tracking-tight sm:text-2xl md:flex-row md:text-4xl lg:mt-0 lg:mb-3 lg:gap-2 lg:text-2xl"
        >
          <Add fontSize="large" />
          <span>New Routine</span>
        </button>

        <button
          className="mt-1 flex flex-col items-center text-base md:flex-row md:text-4xl lg:absolute lg:bottom-0 lg:mx-4 lg:hidden lg:px-4 lg:py-8 lg:text-xl"
          onClick={() => void signOut()}
        >
          <Logout className="mr-2" fontSize="large" />
          <span className="hidden lg:block">Sign Out</span>
        </button>
      </div>
      <div className="hidden text-lg lg:block">
        <div className="my-4 mx-4 h-[1px] bg-primary"></div>
        {routines &&
          routines.map((routine) => {
            return (
              <div
                className="flex items-center gap-2 px-8 py-3"
                key={routine.id}
              >
                <Image
                  src={routine.image}
                  width={50}
                  height={50}
                  alt={routine.title}
                  style={{ background: routine.inverted_color }}
                />
                <Link href={`/routines/${routine.id}`} className="truncate">
                  {routine.title}
                  <div className="text-base text-muted-100/70">24 tasks</div>
                </Link>
              </div>
            );
          })}
        <button
          className="mt-1 flex flex-row items-center text-base md:bottom-0 md:mx-4 md:px-4 md:py-8 md:text-xl lg:absolute lg:text-base"
          onClick={() => void signOut()}
        >
          <Logout className="mr-2" fontSize="medium" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
