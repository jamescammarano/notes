import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { NightShelterRounded } from "@mui/icons-material";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { getProviders, useSession, signIn, signOut } from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers";

type Providers = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export const SignedOut = ({ providers }: Providers): ReactElement => {
  return (
    <>
      <div className="my-4 flex flex-col items-center justify-center bg-foreground">
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name} style={{ marginBottom: 0 }}>
              <button
                className="rounded border-2 border-inverted py-2 px-3"
                onClick={() => void signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        <div className="my-4 text-center">or</div>
        <Link
          className="rounded border-2 border-inverted py-2 px-3"
          href="/todo"
        >
          Continue As Guest
        </Link>
      </div>
    </>
  );
};

import type { ReactElement } from "react";

export const SignedIn = ({
  userId,
}: {
  userId: string | undefined;
}): ReactElement => {
  return (
    <>
      <div className="my-4 flex flex-col items-center justify-center bg-foreground">
        <Link
          href={userId ? `user/${userId}/routines` : "/todo"}
          className="btn-primary m-4"
        >
          Go to bedtime routines
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

const Home: NextPage<Providers> = ({ providers }) => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Nightlite</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-muted text-inverted">
        <div className="container m-8 flex max-w-xl flex-col items-center justify-center gap-6 rounded-md bg-foreground px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-inverted sm:text-[5rem] ">
            <NightShelterRounded className="text-primary" fontSize="inherit" />
            Nightlite
          </h1>
          <div>
            {!sessionData && <SignedOut providers={providers} />}
            {sessionData && (
              <div className="my-4 flex flex-col items-center justify-center bg-foreground">
                <SignedIn userId={sessionData.user?.id} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export default Home;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
