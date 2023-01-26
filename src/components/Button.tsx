import type { ReactElement, ReactNode } from "react";

type Props = {
  variant: string;
  active?: boolean; // currently just for text buttons
  children: string | ReactNode;
};

export const Button = ({ variant, active, children }: Props): ReactElement => {
  return (
    <button
      className={`btn-${variant} ${
        active ? "border-b-2 border-b-primary px-2" : "px-2"
      }`}
    >
      {children}
    </button>
  );
};
