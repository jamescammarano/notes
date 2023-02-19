import Image from "next/image";
import { type ReactElement, useState } from "react";
import { type RoutineWithTasks } from "../types/prisma";
import { EditDescription } from "./EditDescription";

type Props = {
  routine: RoutineWithTasks;
  refetch: () => Promise<unknown>;
};

export const Header = ({ routine, refetch }: Props): ReactElement => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative">
      <div
        className={`flex h-96 w-full bg-foreground p-2 font-extrabold tracking-tight text-inverted`}
        style={{
          background: `linear-gradient(0deg, rgb(47 46 51) 0%,  ${routine.dominant_color} 78%)`,
        }}
      >
        <div
          onClick={() => setIsEditing(!isEditing)}
          className="m-4 flex cursor-pointer"
        >
          <Image
            className={`h-64 rounded`}
            src={routine.image}
            width={256}
            height={256}
            alt={routine.title}
            style={{ background: routine.inverted_color }}
          />
          <div className="ml-4 flex flex-col">
            <p className="m-0 p-0">{routine.title}</p>
            <h1 className="my-auto text-6xl">{routine.title}</h1>
            <p className="text-xl">{routine.description}</p>
          </div>
        </div>
      </div>
      <div
        className={`absolute left-0 right-0 top-44 mx-auto w-2/3 max-w-xl ${
          isEditing ? "block" : "hidden"
        }`}
      >
        <EditDescription
          refetch={refetch}
          routine={routine}
          setEditing={setIsEditing}
        />
      </div>
    </div>
  );
};
