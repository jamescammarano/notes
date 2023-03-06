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
      <div className="mx-auto mt-8 flex w-80 flex-col items-center justify-center gap-8 text-lg md:text-2xl">
        {providers &&
          Object.values(providers).map((provider) => (
            <div className="w-48 md:w-full" key={provider.name}>
              <button
                className="w-full rounded border-2 border-primary bg-primary py-2 md:py-4"
                onClick={() => void signIn(provider.id)}
              >
                Sign up with {provider.name}
              </button>
            </div>
          ))}
        <Link
          className="w-48 rounded border-2 border-primary py-2 text-center md:w-full md:py-4"
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
      <div className="mx-auto mt-8 flex w-80 flex-col items-center justify-center gap-8 text-lg md:text-2xl">
        <div className="w-48 md:w-full">
          <Link
            href="/routines"
            className="block w-full rounded border-2 border-primary bg-primary py-2 text-center md:py-4"
          >
            See routines
          </Link>
        </div>
        <div className="w-48 md:w-full">
          <button
            className="w-full rounded border-2 border-primary py-2 text-center md:py-4"
            onClick={() => void signOut()}
          >
            Sign Out
          </button>
        </div>
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-background-100 text-inverted md:flex-row">
        <div className="relative flex w-full items-center justify-center md:w-1/2 ">
          <div className="splash absolute top-0 h-2/3 w-full md:hidden"></div>
          <div className="sticky z-50 mt-10 flex h-3/5 md:m-0 md:h-auto">
            <div className="flex h-2/3 flex-col justify-center rounded-md border-2 border-primary bg-background-100 py-8 md:m-0 md:h-1/3 md:w-full md:border-0 md:bg-transparent md:py-16 md:px-16 lg:bg-background-100">
              <div className="flex justify-center text-5xl tracking-tight sm:text-4xl md:mb-3 md:items-center md:text-6xl lg:text-[5rem]">
                <NightShelterOutlined
                  className="text-primary"
                  fontSize="inherit"
                />
                <span className="text-inverted">Nightlite</span>
              </div>
              <h1 className="mx-auto mt-4 w-52 text-center text-2xl md:mb-3 md:mt-0 md:w-auto md:text-3xl">
                Simplify your wind down
              </h1>
              <div className="flex justify-center">
                {!sessionData && <SignedOut providers={providers} />}
                {sessionData && <SignedIn />}
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center bg-background-100 md:min-h-screen md:w-1/2">
          <div className="splash absolute z-10 hidden min-h-screen w-full md:block"></div>
          <div className="z-50 flex h-2/3 w-4/5 flex-col justify-center gap-6 rounded-md bg-background-100 py-16 tracking-tight md:sticky md:px-8">
            <div className="text-xl md:text-2xl">
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
