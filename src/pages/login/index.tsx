import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    void router.replace("/");
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <h1>Login</h1>
        <button
          onClick={() =>
            signIn("google", { callbackUrl: "http://localhost:3000/" })
          }
        >
          login
        </button>
      </div>
    );
  }

  return null;
};

export default Login;
