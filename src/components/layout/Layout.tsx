import { useSession } from "next-auth/react";
import type { ReactElement } from "react";

type Props = { children: JSX.Element };

export const Layout = ({ children }: Props): ReactElement => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex">
      <div>{children}</div>
    </div>
  );
};
