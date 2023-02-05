import { NightShelterRounded } from "@mui/icons-material";
import Link from "next/link";
import { type ReactElement, useContext } from "react";
import { NewRoutine } from "../NewRoutine";
import { useSession } from "next-auth/react";
import { RoutineContext } from "../../context/Routine.context";

export const Sidebar = (): ReactElement => {
  const session = useSession();
  const { routines, refetch } = useContext(RoutineContext);
  const userId = session.data?.user?.id;

  return (
    <div className="h-screen w-1/4 bg-black text-muted">
      <Link href="/">
        <div className="flex text-3xl">
          <NightShelterRounded fontSize="inherit" className="text-primary" />
          <div className="text-base text-inverted">Home</div>
        </div>
      </Link>
      <div>
        <Link href={`/user/${userId}/routines`}>
          <div className="text-base">Your Routines</div>
        </Link>
        <NewRoutine numberOfRoutines={routines.length || 0} refetch={refetch} />
        {routines &&
          routines.map((routine) => {
            return (
              <div key={routine.id}>
                <Link href={`/user/${userId}/routine/${routine.id}`}>
                  {routine.title}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};
