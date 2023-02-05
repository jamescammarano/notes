import { type Routine } from "@prisma/client";
import { type ReactElement, useContext } from "react";
import { RoutineContext } from "../context/Routine.context";
type Props = {
  routine: Routine;
};

export const Header = ({ routine }: Props): ReactElement => {
  const { refetch } = useContext(RoutineContext);

  return (
    <div className="to-forground flex w-full bg-gradient-to-b from-[#f7d558] p-2 text-4xl font-extrabold tracking-tight text-foreground">
      <img
        className="rounded border-4 border-inverted bg-primary"
        src={routine.image}
        alt={routine.title}
      />
      <div>
        <h1 className="ml-4">{routine.title}</h1>
        <p>{routine.description}</p>
      </div>
    </div>
  );
};
