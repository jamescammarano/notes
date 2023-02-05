import { type Routine } from "@prisma/client";
import {
  useContext,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  type ReactElement,
} from "react";
import { RoutineContext } from "../context/Routine.context";
import { updateRoutineSchema } from "../schemas/todo";
import { api } from "../utils/api";

type Props = {
  routine: Routine;
  setEditing: Dispatch<SetStateAction<boolean>>;
};

// regenerate image option
export const EditRoutineDescription = ({
  routine,
  setEditing,
}: Props): ReactElement => {
  const { refetch } = useContext(RoutineContext);

  const [newRoutineDetails, setNewRoutineDetails] = useState(routine);
  const { mutateAsync: updateRoutine } = api.todo.updateRoutine.useMutation();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRoutineDetails({
      ...newRoutineDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsedResults = updateRoutineSchema.safeParse(newRoutineDetails);
    if (parsedResults.success) {
      try {
        await updateRoutine(parsedResults.data);
        setEditing(false);
      } catch (error) {
        // TODO Error handling
      }
    }
  };

  return (
    <div className="flex h-80 rounded border-2 border-muted bg-foreground p-8 tracking-tight text-inverted">
      <img
        className="h-48 w-48 rounded-full border-4 border-inverted bg-primary"
        src={routine.image}
        alt={routine.title}
      />
      <div className="w-full">
        <form
          onSubmit={(e) => handleOnSubmit(e)}
          className="ml-4 flex flex-col"
        >
          <div className="my-2 flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              className="rounded border-2 border-muted bg-foreground p-0.5 px-2"
              value={newRoutineDetails.title}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="my-2 flex flex-col">
            <label htmlFor="description">Description</label>
            <input
              className="rounded border-2 border-muted bg-foreground p-0.5 px-2"
              name="description"
              type="text"
              value={
                newRoutineDetails.description !== null
                  ? newRoutineDetails.description
                  : ""
              }
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="mx-auto">
            <button className="btn-primary my-2 px-12" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
