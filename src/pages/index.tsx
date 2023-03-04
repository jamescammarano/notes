import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { NightShelterOutlined } from "@mui/icons-material";
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
      <div className="mx-auto mt-8 flex w-80 flex-col items-center justify-center gap-4 text-2xl">
        {providers &&
          Object.values(providers).map((provider) => (
            <div className="w-full" key={provider.name}>
              <button
                className="w-full rounded border-2 border-primary bg-primary py-4"
                onClick={() => void signIn(provider.id)}
              >
                Sign up with {provider.name}
              </button>
            </div>
          ))}
        <div className="px-8 py-1 text-center text-2xl">or</div>
        <Link
          className="w-full rounded border-2 border-primary py-4 text-center"
          href="/todo"
        >
          Continue As Guest
        </Link>
      </div>
    </>
  );
};

import type { ReactElement } from "react";

export const SignedIn = (): ReactElement => {
  return (
    <>
      <div className="mx-auto mt-8 flex w-80 flex-col items-center justify-center gap-4 text-2xl">
        <Link
          href="/routines"
          className="w-full rounded border-2 border-primary bg-primary py-4 text-center text-2xl"
        >
          Go to bedtime routines
        </Link>
        <div className="px-8 py-1 text-center text-2xl">or</div>
        <button
          className="w-full rounded border-2 border-primary py-4 text-center text-2xl"
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
      <main className="flex min-h-screen bg-background text-inverted">
        <div className="flex w-1/2 items-center justify-center">
          <div className="flex flex-col rounded-md bg-background px-16 py-16">
            <div className="flex items-center tracking-tight sm:text-[6rem]">
              {/* https://github.com/material-components/material-components-web-react/issues/730 */}
              <NightShelterOutlined
                className="icon text-primary"
                fontSize="inherit"
              />
              <span className="text-inverted">Nightlite</span>
            </div>
            <div className="mb-4 text-center text-4xl">
              Simplify your wind down
            </div>

            <div>
              {!sessionData && <SignedOut providers={providers} />}
              {sessionData && <SignedIn />}
            </div>
          </div>
        </div>
        <div className="splash flex w-1/2 items-center justify-center">
          <div className="flex h-2/3 w-4/5 flex-col justify-center gap-6 rounded-md bg-background px-8 py-16  tracking-tight">
            <div className="text-2xl">
              Nightlife is a task organizer with a focus on sleep hygiene
            </div>

            <div className="text-1xl flex flex-col gap-4">
              <li>Create multiple bedtime routines to fit your life</li>
              <li>Stay focused with pomodoro timer</li>
            </div>

            <div className="text-2xl">What is sleep hygiene?</div>
            <div>
              Sleep hygiene is doing this habit and not doing that habit
            </div>
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
