import type { ReactElement } from "react";

type Props = {
  type: string;
  active?: boolean; // currently just for text buttons
  children: any;
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
