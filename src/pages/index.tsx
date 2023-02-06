import { type NextPage } from "next";
import Head from "next/head";
import { NightShelterRounded } from "@mui/icons-material";

const Home: NextPage = () => {
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
        </div>
      </main>
    </>
  );
};

export default Home;
