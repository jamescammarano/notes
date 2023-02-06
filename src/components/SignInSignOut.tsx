import { type CtxOrReq } from "next-auth/client/_utils";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
  LiteralUnion,
  useSession,
} from "next-auth/react";
import type { ReactElement } from "react";
import { SignedIn } from "./SignedIn";
import { SignIn } from "./SignIn";

type Props = {
  csrfToken: string | undefined;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export const SignInSignOut = ({ providers }: Props): ReactElement => {
  const { data: sessionData } = useSession();
  return (
    <div>
      <div>{!sessionData && <SignIn providers={providers} />}</div>
      <div>{sessionData && <SignedIn />}</div>
    </div>
  );
};

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
