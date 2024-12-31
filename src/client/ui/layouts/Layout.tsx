import { Navigation } from "@/client/ui/modules/Head/Navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Rubik } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import styled from "styled-components";

const rubik = Rubik({ subsets: ["latin"] });

interface ComponentProps {
  children: ReactNode;
  title?: string;
}

/**
 * SessionLayout component that wraps its children with a navigation bar and handles user session.
 *
 * This component requires the user to be authenticated. If the user is not authenticated,
 * they will be redirected to the login page. It also applies a specific font style and
 * animates the navigation bar on mount.
 *
 * @param {Object} props - The props for the component.
 * @param {ReactNode} props.children - The child elements to be rendered within the layout.
 * @param {string} [props.title] - Optional title for the page, displayed in the document head.
 *
 * @returns {JSX.Element} The rendered layout component.
 */
const SessionLayout = ({ children, title }: ComponentProps) => {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      void router.replace("/login");
    },
  });

  return (
    <Wrapper className={rubik.className}>
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
    </Wrapper>
  );
};

export default SessionLayout;

const Wrapper = styled.div`
  margin: 0 2rem;
`;