import { NightShelter, NightShelterRounded } from "@mui/icons-material";
import type { ReactElement } from "react";

type Props = {
  // currently just for text buttons
  title: string;
};

export const Header = ({ title }: Props): ReactElement => {
  return (
    <div className="flex w-screen bg-muted p-2 text-4xl font-extrabold tracking-tight text-foreground">
      <NightShelterRounded fontSize="inherit" className="text-primary" />
      <h1 className="ml-4 ">{title}</h1>
    </div>
  );
};
