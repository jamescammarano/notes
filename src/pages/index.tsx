import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { NightShelterTwoTone } from "@mui/icons-material";
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
      <div className="my-4 flex flex-col items-center justify-center text-xl">
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name} style={{ marginBottom: 0 }}>
              <button
                className="rounded border-2 border-primary bg-primary py-4 px-8"
                onClick={() => void signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        <div className="my-4 text-center">or</div>
        <Link
          className="rounded border-2 border-inverted py-4 px-8"
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
      <div className="my-4 flex flex-col items-center">
        <Link
          href="/routines"
          className="rounded border-2 border-primary bg-primary py-4 px-8"
        >
          Go to bedtime routines
        </Link>
        <div className="my-4 text-center">or</div>
        <button
          className="rounded border-2 border-inverted py-4 px-8"
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
        <div className="w-1/2">Simplify your wind down</div>
        <div className="splash flex w-full items-center justify-center">
          <div className="flex flex-col gap-6 rounded-md bg-background px-10 py-16">
            <div className="flex items-center tracking-tight sm:text-[5rem]">
              {/* https://github.com/material-components/material-components-web-react/issues/730 */}
              <NightShelterTwoTone
                className="text-primary"
                fontSize="inherit"
              />
              <span className="text-inverted">Nightlite</span>
            </div>
            <div>
              {!sessionData && <SignedOut providers={providers} />}
              {sessionData && (
                <div className="my-4 flex flex-col items-center justify-center">
                  <SignedIn />
                </div>
              )}
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
