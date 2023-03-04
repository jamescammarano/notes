import { NightShelterRounded, PlaylistAdd } from "@mui/icons-material";
import Link from "next/link";
import { type ReactElement, useContext } from "react";
import { useSession } from "next-auth/react";
import { RoutineContext } from "../context/Routine.context";
import { unsavedRoutineSchema } from "../schemas/todo";
import { api } from "../utils/api";

export const Sidebar = (): ReactElement => {
  const { data: sessionData } = useSession();
  const { routines, refetch } = useContext(RoutineContext);
  const userId = sessionData?.user?.id;

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
    <div className="min-h-screen w-1/4 bg-black text-muted">
      <div className="mx-3 my-6 flex flex-col gap-2 text-lg">
        <Link href="/">
          <div className="flex items-center gap-2">
            <NightShelterRounded className="text-primary" fontSize="inherit" />
            <span className="text-inverted">Nightlite</span>
          </div>
        </Link>

        <button
          onClick={() => void handleClick()}
          className="flex items-center gap-2"
        >
          <PlaylistAdd fontSize="inherit" />
          <span>Create Routine</span>
        </button>
        <Link href={userId ? `/routines` : "/todo"}>Your Routines</Link>
        {routines &&
          routines.map((routine) => {
            return (
              <div key={routine.id}>
                <Link href={userId ? `/routines/${routine.id}` : "/todo"}>
                  {routine.title}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};
