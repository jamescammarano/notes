import { type Routine } from "@prisma/client";
import { type ReactElement, useState } from "react";
import { EditRoutineDescription } from "./EditRoutineDescription";
type Props = {
  routine: Routine;
  refetch: () => Promise<unknown>;
};

export const Header = ({ routine, refetch }: Props): ReactElement => {
  const [editing, setEditing] = useState(false);
  const [newRoutineDetails, setNewRoutineDetails] = useState(routine);

  const toggleEditor = () => {
    setEditing(!editing);
  };

  return (
    <div className="relative">
      <div className="flex h-96 w-full bg-gradient-to-b from-[#f7d558] p-2 font-extrabold tracking-tight text-foreground">
        <div onClick={() => toggleEditor()} className="m-4 flex cursor-pointer">
          <img
            className="h-64 rounded bg-primary"
            src={routine.image}
            alt={routine.title}
          />
          <div className="ml-4">
            <h1 className="text-4xl">{routine.title}</h1>
            <p className="text-xl">{routine.description}</p>
          </div>
        </div>
      </div>
      <div
        className={`absolute left-0 right-0 top-44 mx-auto w-2/3 max-w-xl ${
          editing ? "block" : "hidden"
        }`}
      >
        <EditRoutineDescription
          newRoutineDetails={newRoutineDetails}
          setNewRoutineDetails={setNewRoutineDetails}
          refetch={refetch}
          routine={routine}
          setEditing={setEditing}
        />
      </div>
    </div>
  );
};
