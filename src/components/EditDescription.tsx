import { useSession } from "next-auth/react";
import {
  useEffect,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  type ReactElement,
  useState,
} from "react";
import { updateRoutineSchema } from "../schemas/todo";
import { type RoutineWithTasks } from "../types/prisma";
import { api } from "../utils/api";
import { generateImageURL } from "../utils/image-tools";
import { randomUUID } from "crypto";
import Image from "next/image";
import { Loop } from "@mui/icons-material";

type Props = {
  isEditing: boolean;
  routine: RoutineWithTasks;
  setEditing: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<unknown>;
};

// regenerate image option
export const EditDescription = ({
  routine,
  isEditing,
  setEditing,
  refetch,
}: Props): ReactElement => {
  const { data: sessionData } = useSession();
  const [updatedDetails, setUpdatedDetails] = useState(routine);
  const { mutateAsync: updateRoutine } = api.todo.updateRoutine.useMutation();

  const { data: invertedColor, refetch: fetchImageBgColor } =
    api.todo.getInvertedColor.useQuery(updatedDetails.image);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedDetails({
      ...routine,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (routine.description === null) {
      setUpdatedDetails({ ...updatedDetails, description: "" });
    }
    const parsedResults = updateRoutineSchema.safeParse(updatedDetails);

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

  const refreshImage = async () => {
    const newUrl = generateImageURL(
      sessionData?.user?.id ?? randomUUID(),
      routine.title
    );
    setUpdatedDetails({ ...updatedDetails, image: newUrl });
    await fetchImageBgColor();
  };

  useEffect(() => {
    if (!isEditing) {
      setUpdatedDetails(routine);
    }
  }, [isEditing]);

  useEffect(() => {
    if (invertedColor) {
      setUpdatedDetails({ ...updatedDetails, inverted_color: invertedColor });
    }
  }, [invertedColor]);

  return (
    <div className="h-90 w-90 flex flex-col rounded border-2 border-muted bg-foreground px-8 pb-8 tracking-tight text-inverted">
      <h1 className="mt-3 mb-6 text-xl">Edit details</h1>
      <div className="flex w-full flex-row">
        <button
          onClick={() => void refreshImage()}
          className="group relative h-fit text-center"
          style={{ background: updatedDetails.inverted_color }}
        >
          <Image
            height={256}
            width={256}
            className="rounded border-4 border-inverted group-hover:bg-foreground group-hover:opacity-75"
            src={updatedDetails.image}
            alt={updatedDetails.title}
          />
          <div className="absolute top-1/2 flex h-fit w-full flex-col text-6xl opacity-0 group-hover:opacity-100">
            <Loop className="mx-auto" fontSize="inherit" />
            <div className=" text-lg font-bold">Refresh Image</div>
          </div>
        </button>
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
                value={updatedDetails.title}
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
                  updatedDetails.description !== null
                    ? updatedDetails.description
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
