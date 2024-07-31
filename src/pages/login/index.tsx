import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {NextPageWithLayout} from "@/types/global";
import {Button} from "@/client/ui/components/action/buttons/Button";
import styled from "styled-components";
import {H1} from "@/client/ui/components/layout/Text";
import {LoginLayout} from '@/client/ui/layouts/LoginLayout';

const Login: NextPageWithLayout = () => {
    const {status} = useSession();
    const router = useRouter();

    if (status === "authenticated") {
        void router.replace("/");
    }

    if (status === "unauthenticated") {
        return (
            <Container>
                <H1 $isCentered>Welcome to Persodict</H1>
                <Button
                    onClick={() => signIn("google", {callbackUrl: "http://localhost:3000/"})}
                    label={"Login with Google"}
                    icon={"Google"}
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

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10rem auto;
  padding: 4rem 3rem;
  max-width: 40rem;
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: none;

  @media (min-width: 476px) {
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fffb;
  }
`;