import React, { ReactNode } from "react";
import { Navigation } from "../modules/Head/Navigation";

interface ComponetnProps {
    children: ReactNode;
}

const Layout = ({ children }: ComponetnProps) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
