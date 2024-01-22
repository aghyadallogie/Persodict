import { Navigation } from "@/client/ui/modules/Head/Navigation";
import TranslateModule from "@/client/ui/modules/Translate/TranslateModule";
import Head from "next/head";

export default function Home() {
  return (
    <main style={{ maxWidth: "40rem", margin: "auto" }}>
      <TranslateModule />
    </main>
  );
}
