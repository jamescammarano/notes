import { NightShelterRounded } from "@mui/icons-material";
import Link from "next/link";
import { type ReactElement, useContext } from "react";
import { NewRoutine } from "../NewRoutine";
import { useSession } from "next-auth/react";
import { RoutineContext } from "../../context/Routine.context";

export const Sidebar = (): ReactElement => {
  const { data: sessionData } = useSession();
  const { routines, refetch } = useContext(RoutineContext);
  const userId = sessionData?.user?.id;

  return (
    <div className="h-screen w-1/4 bg-black text-muted">
      <div className="mx-3 my-6 ">
        <Link href="/">
          <div className="mb-2 flex text-3xl">
            <NightShelterRounded fontSize="inherit" className="text-primary" />
            <div className="text-base text-inverted">Home</div>
          </div>
        </Link>
        <NewRoutine numberOfRoutines={routines.length} refetch={refetch} />
        {routines &&
          routines.map((routine) => {
            return (
              <div key={routine.id}>
                <Link
                  href={
                    userId ? `/user/${userId}/routine/${routine.id}` : "/todo"
                  }
                >
                  {routine.title}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};
