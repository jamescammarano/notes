import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import type { ReactElement } from "react";

export const SignedIn = (): ReactElement => {
  const { data } = useSession();
  return (
    <>
      <div className="my-4 flex flex-col items-center justify-center bg-foreground">
        <Link
          href={data?.user?.id ? `user/${data.user.id}/routine` : "/todo"}
          className="btn-primary m-4"
        >
          {"          "}
        </Link>
        <div className="my-4 text-center">or</div>
        <button
          className="rounded border-2 border-inverted py-2 px-3"
          onClick={() => void signOut()}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};
