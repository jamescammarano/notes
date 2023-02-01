import { NightShelterRounded } from "@mui/icons-material";
import Link from "next/link";
import type { ReactElement } from "react";
import { api } from "../../utils/api";
import { NewList } from "../NewList";
import { useSession } from "next-auth/react";

export const Sidebar = (): ReactElement => {
  const { data: lists, refetch: refetchCall } = api.todo.getAllLists.useQuery();
  const session = useSession();

  const refetch = async () => {
    await refetchCall();
  };

  return (
    <div className="h-screen w-1/4 bg-black text-muted">
      <Link href="/">
        <div className="flex text-3xl">
          <NightShelterRounded fontSize="inherit" className="text-primary" />{" "}
          <div className="text-base text-inverted">Home</div>
        </div>
      </Link>
      <div>
        <NewList numberOfLists={lists?.length || 0} refetch={refetch} />
        {lists &&
          lists.map((list) => {
            return (
              <div key={list.id}>
                <Link
                  href={`/user/${session.data?.user?.id}/routine/${list.id}`}
                >
                  {list.title}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};
