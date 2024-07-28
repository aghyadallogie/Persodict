import {Navigation} from "@/client/ui/modules/Head/Navigation";
import {motion} from "framer-motion"; // Import motion from Framer Motion
import {useSession} from "next-auth/react";
import {Rubik} from "next/font/google";
import Head from "next/head";
import {useRouter} from "next/router";
import type {ReactNode} from "react";

const rubik = Rubik({ subsets: ["latin"] });

interface ComponentProps {
  children: ReactNode;
  title?: string;
}

const SessionLayout = ({ children, title }: ComponentProps) => {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      void router.replace("/login");
    },
  });

  return (
    <div className={rubik.className} style={{ margin: "0 2rem" }}>
      <Head>
        <title>{title}</title>
      </Head>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <Navigation />
      </motion.nav>
      {children}
    </div>
  );
};

export default SessionLayout;
