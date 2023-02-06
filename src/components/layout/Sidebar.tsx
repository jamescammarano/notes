import { NightShelterRounded } from "@mui/icons-material";
import Link from "next/link";
import { type ReactElement, useContext } from "react";
import { NewList } from "../NewList";
import { useSession } from "next-auth/react";
import { RoutineContext } from "../../context/Routine.context";

export const Sidebar = (): ReactElement => {
  const { data } = useSession();
  const { routines, refetch } = useContext(RoutineContext);

  return (
    <div className="h-screen w-1/4 bg-black text-muted">
      <Link href="/">
        <div className="flex text-3xl">
          <NightShelterRounded fontSize="inherit" className="text-primary" />{" "}
          <div className="text-base text-inverted">Home</div>
        </div>
      </Link>
      <div>
        <NewList routines={routines || []} refetch={refetch} />
        {routines &&
          routines.map((routine) => {
            return (
              <div key={routine.id}>
                <Link
                  href={
                    data?.user?.id
                      ? `/user/${data.user.id}/routine/${routine.id}`
                      : "/todo"
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
