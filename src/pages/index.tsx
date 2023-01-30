import { type NextPage } from "next";
import Head from "next/head";
import { NightShelterRounded } from "@mui/icons-material";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { useSession } from "next-auth/react";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import type { CtxOrReq } from "next-auth/client/_utils";
import type { BuiltInProviderType } from "next-auth/providers";
import { SignIn } from "../components/SignIn";
import { SignedIn } from "../components/SignedIn";

type Props = {
  csrfToken: string | undefined;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

const Home: NextPage = ({ providers }: Props) => {
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
          <div>{!sessionData && <SignIn providers={providers} />}</div>
          <div>{sessionData && <SignedIn />}</div>
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
