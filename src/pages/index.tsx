import TranslateModule from "@/client/ui/modules/Translate/TranslateModule";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Persodict</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"
        />
      </Head>
      <main style={{ maxWidth: "40rem", margin: "auto" }}>
        <TranslateModule />
      </main>
    </>
  );
}
