import { type Routine } from "@prisma/client";
import { createContext, useMemo, type ReactNode } from "react";
import { api } from "../utils/api";

type Props = {
  children: ReactNode | ReactNode[];
};

export const RoutineContext = createContext({
  routines: [] as Routine[],
  refetch: undefined as unknown as () => Promise<unknown>,
});

export const RoutineProvider = ({ children }: Props) => {
  const { data, refetch } = api.todo.getAllLists.useQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ routines: data ?? [], refetch }), [data]);

  return (
    <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>
  );
};
