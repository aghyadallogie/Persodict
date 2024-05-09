import { GoogleSignInButton } from "@/client/ui/components/GoogleSignInButton";
import { Wrapper } from "..";

interface PageProps {
  userLangs: string[];
}

const Authenticate = () => {

  return (
    <Wrapper>
        <GoogleSignInButton>
            Login With Google!
        </GoogleSignInButton>
    </Wrapper>
  );
};

export default Authenticate;