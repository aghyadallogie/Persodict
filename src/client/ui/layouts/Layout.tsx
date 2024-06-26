import type { ReactNode } from "react";
import React from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { Rubik } from "next/font/google";
import { Navigation } from "../modules/Head/Navigation";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
