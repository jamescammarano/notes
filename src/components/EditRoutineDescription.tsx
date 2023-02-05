import { type Routine } from "@prisma/client";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  type ReactElement,
} from "react";
import { updateRoutineSchema } from "../schemas/todo";
import { api } from "../utils/api";

type Props = {
  routine: Routine;
  setEditing: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<unknown>;
};

// regenerate image option
export const EditRoutineDescription = ({
  routine,
  setEditing,
  refetch,
}: Props): ReactElement => {
  const [newRoutineDetails, setNewRoutineDetails] = useState(routine);
  const { mutateAsync: updateRoutine } = api.todo.updateRoutine.useMutation();

  useEffect(() => {
    setNewRoutineDetails(routine);
  }, [routine]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewRoutineDetails({
      ...newRoutineDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newRoutineDetails.description === null) {
      setNewRoutineDetails({ ...newRoutineDetails, description: "" });
    }
    const parsedResults = updateRoutineSchema.safeParse(newRoutineDetails);
    if (parsedResults.success) {
      try {
        await updateRoutine(parsedResults.data);
        await refetch();
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
          onSubmit={(e) => void handleOnSubmit(e)}
          className="ml-4 flex flex-col"
        >
          <div className="mb-2 flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              placeholder="Title"
              className="rounded border-2 border-muted bg-foreground p-0.5 px-2"
              value={newRoutineDetails.title}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="my-2 flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              className="h-full rounded border-2 border-muted bg-foreground p-1 px-2"
              name="description"
              rows={4}
              placeholder="Add an optional description"
              value={
                newRoutineDetails.description !== null
                  ? newRoutineDetails.description
                  : undefined
              }
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="place-self-end">
            <button className="btn-primary my-2 px-12" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
