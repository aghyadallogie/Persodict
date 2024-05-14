import React from "react";
import { signIn } from "next-auth/react";

const Login = () => {
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
};

export default Login;