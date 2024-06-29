import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../../types/global";
import { Wrapper } from "../index";
import { Button } from "@/client/ui/components/action/buttons/Button";

const Login: NextPageWithLayout = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    void router.replace("/");
  }

  if (status === "unauthenticated") {
    return (
      <Wrapper>
        <h1>Login</h1>
        <Button
          onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/" })}
          label={"Login with Google"}
          icon={"Google"}
          position={"left"}
          isDisabled={false}
          size={"small"}
          style={"dark"}
          type={"button"}
          variant={"primary"}>
        </Button>
      </Wrapper>
    );
  }

  return null;
};

export default Login;

Login.getLayout = (router, pageProps, PageComponent) => (
  <PageComponent router={router} {...pageProps} />
);
