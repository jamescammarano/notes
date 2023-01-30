import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import type { ReactElement } from "react";

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export const SignIn = ({ providers }: Props): ReactElement => {
  return (
    <>
      <div className="my-4 flex flex-col items-center justify-center bg-foreground">
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name} style={{ marginBottom: 0 }}>
              <button
                className="rounded border-2 border-inverted py-2 px-3"
                onClick={() => signIn(provider.id)}
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
