import { Button } from "@/client/ui/components/action/buttons/Button";
import { signIn } from "next-auth/react";
import { useState } from 'react';
import styled from 'styled-components';
import { P } from "../components/layout/Text";

/**
 * LoginModule component for handling user login via credentials.
 *
 * This component provides input fields for email and password, handles login logic,
 * displays error feedback, and triggers a redirect on successful login.
 *
 * @returns {JSX.Element} The rendered login form module.
 */
const LoginModule = ({ setIsNewUser }: { setIsNewUser: (isNewUser: boolean) => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Login failed: " + res.error);
        } else {
            window.location.href = "/";
        }
    };

    return (
        <StyledForm>
            <Input
                placeholder="Enter Email"
                type="email"
                onChange={e => setEmail(e.target.value)}
                $flash={!!error}
            />
            <Input
                placeholder="Enter Password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                $flash={!!error}
            />
            <Button label='Login' onClick={handleLogin} />
            <StyledLink $size="tiny">
                If you do not have an account already ?{' '}
                <StyledLink $underlined={true} $size="tiny" $clickable={true} onClick={() => setIsNewUser(true)}>
                    Register
                </StyledLink>
            </StyledLink>
        </StyledForm>
    )
};

export default LoginModule;

const StyledForm = styled.form`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
`;

const Input = styled.input<{ $flash?: boolean }>`
    background: transparent;
    border: none;
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.shadows.inputShadow};
    color: ${({ theme }) => theme.colors.primaryFontColor};
    font-size: 1em;
    outline: none;
    padding: 15px 20px;
    padding-left: 40px;
    width: 100%;

    ::placeholder {
        color: ${({ theme }) => theme.colors.textPlaceholder};
        font-size: 0.8em;
        font-weight: 400;
        letter-spacing: 1px;
    }

    :active {
        ::placeholder {
            visibility: hidden;
        }
    }

    ${({ $flash, theme }) => $flash && `
        animation: flash-outline 0.6s 2;
        @keyframes flash-outline {
            0% { outline: none; }
            30% { outline: 1px solid ${theme.colors.error}; }
            70% { outline: 1px solid ${theme.colors.error}; }
            100% { outline: none; }
        }
    `}
`;

const StyledLink = styled(P)`
    color: ${({ theme }) => theme.colors.primaryAccentFontColor};
    ${({ $underlined }) => $underlined && `
        text-decoration: underline;
    `}
`;