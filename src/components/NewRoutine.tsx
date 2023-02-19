import type { ReactElement } from "react";
import { PlaylistAdd } from "@mui/icons-material";
import { unsavedRoutineSchema } from "../schemas/todo";
import { api } from "../utils/api";

type Props = {
  numberOfRoutines: number;
  refetch: () => Promise<unknown>;
};

export const NewRoutine = ({
  numberOfRoutines,
  refetch,
}: Props): ReactElement => {
  const { mutateAsync } = api.todo.createRoutine.useMutation();

  const handleClick = async () => {
    const parseResults = unsavedRoutineSchema.safeParse({
      title: `My Routine #${numberOfRoutines + 1}`,
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
