import type { ReactElement, ReactNode } from "react";

type Props = {
  type: string;
  active?: boolean; // currently just for text buttons
  children: string | ReactNode;
};

export const Button = ({ type, active, children }: Props): ReactElement => {
  return (
    <button
      className={`btn-${type} ${
        active ? "border-b-2 border-b-primary px-2" : "px-2"
      }`}
    >
      {children}
    </button>
  );
};
