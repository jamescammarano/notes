import type { ReactElement } from "react";

type Props = { children: JSX.Element };

export const Layout = ({ children }: Props): ReactElement => {
  return (
    <div className="flex">
      <div>{children}</div>
    </div>
  );
};
