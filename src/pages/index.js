import Head from "next/head";
import HomePage from "@/components/home/home-page";
import { useRouter } from "next/router";
 

export default function Home() {
  const router = useRouter();
  const currentPath = router.pathname;
  let path = "Pearl Tech E Solutions";


  return (
    <div>
      <Head>
        <title>{path}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="" />
      </Head>

      <main>
        <HomePage  />
      </main>
    </div>
  );
}
