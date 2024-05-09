import { FC, ReactNode } from "react";
import { Button } from "./base/Button";
import { signIn } from "next-auth/react";

interface ComponentProps {
  children: ReactNode;
}

export const GoogleSignInButton: FC<ComponentProps> = ({ children }) => {
  const loginWithGoogle = () =>
    signIn("google", { callbackUrl: "http://localhost:3000/" });

  return <Button onClick={loginWithGoogle}>{children}</Button>;
};