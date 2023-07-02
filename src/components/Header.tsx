import Image from "next/image";
import { type ReactElement, useState } from "react";
import { type RoutineWithTasks } from "../types/prisma";
import { EditDescription } from "./EditDescription";
import chroma from "chroma-js";

type Props = {
  routine: RoutineWithTasks;
  refetch: () => Promise<unknown>;
};

export const Header = ({ routine, refetch }: Props): ReactElement => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <div className="relative">
        <div
          className={`flex h-fit w-full p-2 font-extrabold tracking-tight text-inverted`}
          style={{
            background: `${routine.inverted_color}`,
          }}
        >
          <div
            onClick={() => setIsEditing(!isEditing)}
            className="flex cursor-pointer flex-col items-center text-center sm:flex-row"
          >
            <Image
              src={routine.image}
              width={256}
              height={256}
              alt={routine.title}
            />
            <div className="ml-4 flex items-center justify-center">
              <h1 className="text-6xl">{routine.title}</h1>
              <p className="text-xl">{routine.description}</p>
            </div>
          </div>
        </div>
        <div
          className="header-bg absolute h-40 w-full"
          style={{
            background: `linear-gradient(180deg, ${chroma(
              routine.inverted_color
            )
              .darken()
              .hex()} 26.56%, rgba(109, 66, 202, 0) 87.5%)`,
          }}
        ></div>

        <div
          className={`w-90 absolute left-0 right-0 top-44 z-50 mx-auto max-w-xl ${
            isEditing ? "block" : "hidden"
          }`}
        >
          <EditDescription
            isEditing={isEditing}
            refetch={refetch}
            routine={routine}
            setEditing={setIsEditing}
          />
        </div>
      </div>
    </div>
  );
};
