import { useSession } from "next-auth/react";
import {
  useEffect,
  type MouseEvent,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  type ReactElement,
} from "react";
import { updateRoutineSchema } from "../schemas/todo";
import { type RoutineWithTasks } from "../types/prisma";
import { api } from "../utils/api";
import { generateImageURL } from "../utils/image-tools";
import { randomUUID } from "crypto";
import Image from "next/image";

type Props = {
  routine: RoutineWithTasks;
  setEditing: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<unknown>;
  newRoutineDetails: RoutineWithTasks;
  setNewRoutineDetails: Dispatch<SetStateAction<RoutineWithTasks>>;
};

// regenerate image option
export const EditRoutineDescription = ({
  routine,
  setEditing,
  refetch,
  newRoutineDetails,
  setNewRoutineDetails,
}: Props): ReactElement => {
  const session = useSession();
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

  const refreshImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newUrl = generateImageURL(
      session.data?.user?.id ?? randomUUID(),
      newRoutineDetails.title
    );
    setNewRoutineDetails({ ...newRoutineDetails, image: newUrl });
  };
  return (
    <div className="h-90 w-90 flex flex-col rounded border-2 border-muted bg-foreground px-8 pb-8 tracking-tight text-inverted">
      <h1 className="mt-3 mb-6 text-xl">Edit details</h1>
      <div className="flex w-full flex-row">
        <div className="">
          <Image
            height={240}
            width={240}
            className="rounded border-4 border-inverted hover:opacity-50"
            style={{ background: routine.inverted_color }}
            src={newRoutineDetails.image}
            alt={newRoutineDetails.title}
          />
          <button onClick={(e) => refreshImage(e)}>Refresh Image</button>
        </div>
        <div className="ml-8 w-3/4">
          <form
            onSubmit={(e) => void handleOnSubmit(e)}
            className="flex flex-col"
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
    </div>
  );
};
