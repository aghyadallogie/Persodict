import { ButtonIcons } from "@/client/ui/assets/images/icons";
import { Button } from "@/client/ui/components/action/buttons/Button";
import { H1 } from "@/client/ui/components/layout/Text";
import { LoginLayout } from '@/client/ui/layouts/LoginLayout';
import LoginModule from "@/client/ui/modules/LoginModule";
import RegisterModule from "@/client/ui/modules/RegisterModule";
import { NextPageWithLayout } from "@/types/global";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

/**
 * Login page component for Persodict.
 *
 * This component handles user authentication state:
 * - If the user is authenticated, redirects to the home page.
 * - If unauthenticated, displays the login form and social login options.
 *
 * @returns {JSX.Element | null} The rendered login page or null if redirecting.
 */
const Login: NextPageWithLayout = () => {
    const { status } = useSession();
    const router = useRouter();
    const [isNewUser, setIsNewUser] = useState(false);

    if (status === "authenticated") {
        void router.replace("/");
    }

    if (status === "unauthenticated") {
        return (
            <PageWrapper>
                <Container>
                    <H1 $isCentered>Welcome to Persodict</H1>
                    {isNewUser ? <RegisterModule setIsNewUser={setIsNewUser} /> : <LoginModule setIsNewUser={setIsNewUser} />}
                    <Divider />
                    <Button
                        onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/" })}
                        label={"Login with Google"}
                        icon={ButtonIcons.Google}
                        isDisabled={false}
                        style={"light"}
                        type={"button"}
                        variant={"primary"}>
                    </Button>
                    {/* <Button
                    onClick={() => signIn("facebook", {callbackUrl: "http://localhost:3000/"})}
                    label={"Login with Facebook"}
                    icon={"Facebook"}
                    isDisabled={false}
                    style={"light"}
                    type={"button"}
                    variant={"primary"}>
                </Button> */}
                </Container>
            </PageWrapper>
        );
    }

    return null;
};

export default Login;

Login.getLayout = (router, pageProps, PageComponent) => (
    <LoginLayout>
        <PageComponent router={router} {...pageProps} />
    </LoginLayout>
);

const PageWrapper = styled.main`
  min-height: 95dvh;
  display: grid;
  place-items: center;
  padding: 0 1rem;
`;

export const Container = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    width: 36dvw;
    border: none;
    box-shadow: none;
  
    @media (min-width: 476px) {
        border: 1px solid ${({ theme }) => theme.colors.hoverColor};
        border-radius: 10px;
        box-shadow: ${({ theme }) => theme.shadows.buttonShadow};
        padding: 3.4rem 2rem;
    }
`;

export const Divider = styled.div`
    width: 80%;
    margin: .4rem 0;
    border-top: 1px solid ${({ theme }) => theme.colors.hoverColor};
`;