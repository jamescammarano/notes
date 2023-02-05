import { type Routine } from "@prisma/client";
import { type ReactElement, useState, useEffect } from "react";
import { EditRoutineDescription } from "./EditRoutineDescription";
type Props = {
  routine: Routine;
  refetch: () => any;
};

export const Header = ({ routine, refetch }: Props): ReactElement => {
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    refetch();
  }, [editing]);
  return (
    <div className="relative">
      <div className="flex h-96 w-full bg-gradient-to-b from-[#f7d558] p-2 text-4xl font-extrabold tracking-tight text-foreground">
        <div
          onClick={() => setEditing(!editing)}
          className="m-4 flex cursor-pointer"
        >
          <img
            className="h-64 rounded bg-primary"
            src={routine.image}
            alt={routine.title}
          />
          <div>
            <h1 className="ml-4">{routine.title}</h1>
            <p>{routine.description}</p>
          </div>
        </div>
      </div>
      <div
        className={`absolute left-0 right-0 top-44 mx-auto w-2/3 ${
          editing ? "block" : "hidden"
        }`}
      >
        <EditRoutineDescription routine={routine} setEditing={setEditing} />
      </div>
    </div>
  );
};
