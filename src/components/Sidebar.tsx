import { NightShelterOutlined, PlaylistAdd } from "@mui/icons-material";
import Link from "next/link";
import { type ReactElement, useContext } from "react";
import { signOut } from "next-auth/react";
import { RoutineContext } from "../context/Routine.context";
import { unsavedRoutineSchema } from "../schemas/todo";
import { api } from "../utils/api";

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
    <div className="min-h-screen w-48 max-w-2xl bg-black text-muted">
      <div className="mx-3 my-6 flex flex-col gap-2 text-lg">
        <Link href="/">
          <div className="flex items-center gap-2">
            <NightShelterOutlined className="text-primary" fontSize="inherit" />
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
        <Link href={`/routines`}>Your Routines</Link>
        {routines &&
          routines.map((routine) => {
            return (
              <div key={routine.id}>
                <Link href={`/routines/${routine.id}`}>{routine.title}</Link>
              </div>
            );
          })}
        <button className="text-left" onClick={() => void signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
};
