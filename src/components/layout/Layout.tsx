import { useSession } from "next-auth/react";
import type { ReactElement } from "react";
import { Sidebar } from "./Sidebar";

type Props = { children: JSX.Element };

export const Layout = ({ children }: Props): ReactElement => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex">
      {sessionData && (
        <div className="w-1/4">
          <Sidebar />
          <div className="w-3/4">{children}</div>
        </div>
      )}
      <div className="w-full">{children}</div>
    </div>
  );
};
