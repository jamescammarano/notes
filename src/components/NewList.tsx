import type { ReactElement } from "react";
import { PlaylistAdd } from "@mui/icons-material";
import { unsavedListSchema } from "../schemas/todo";
import { api } from "../utils/api";
import { type Routine } from "@prisma/client";

type Props = {
  routines: Routine[];
  refetch: () => Promise<unknown>;
};

export const NewList = ({ routines, refetch }: Props): ReactElement => {
  const { mutateAsync } = api.todo.createList.useMutation();

  const handleClick = async () => {
    const parseResults = unsavedListSchema.safeParse({
      title: `My Routine #${routines.length + 1}`,
    });

    if (parseResults.success) {
      try {
        await mutateAsync({ title: parseResults.data.title });
        await refetch();
      } catch (error) {
        //  TODO Error handling
      }
    }
  };

  return (
    <button
      onClick={() => void handleClick()}
      className="flex text-3xl text-muted"
    >
      <PlaylistAdd fontSize="inherit" />
      <div className="text-base">Create Routine</div>
    </button>
  );
};
