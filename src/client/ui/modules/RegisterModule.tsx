import { Button } from "@/client/ui/components/action/buttons/Button";
import { signIn } from "next-auth/react";
import { useState } from 'react';
import styled from 'styled-components';
import { P } from "../components/layout/Text";

/**
 * RegisterModule component for user registration.
 * 
 * Provides a form with email, password, and password confirmation fields.
 * Validates password match, registers the user via API, then signs them in automatically.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.setIsNewUser - Callback to toggle between login and register views.
 * @returns {JSX.Element} Registration form with validation and error handling.
 */
const RegisterModule = ({ setIsNewUser }: { setIsNewUser: (isNewUser: boolean) => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    /**
     * Handles user registration flow.
     * Validates password confirmation, registers user, then signs them in.
     */
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const registerRes = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const registerData = await registerRes.json();

            if (!registerRes.ok) {
                setError(registerData.message || "Registration failed");
                return;
            }

            const signInRes = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (signInRes?.error) {
                setError("Registration successful but login failed: " + signInRes.error);
            } else {
                window.location.href = "/";
            }
        } catch (error) {
            setError("Registration failed: " + (error instanceof Error ? error.message : "Unknown error"));
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
            <Input
                placeholder="Confirm Password"
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
                $flash={!!error}
            />
            <Button label='Register' onClick={handleRegister} />
            <StyledLink $size="tiny">
                You already have an account ?{' '}
                <StyledLink $underlined={true} $size="tiny" $clickable={true} onClick={() => setIsNewUser(false)}>
                    Login
                </StyledLink>
            </StyledLink>
        </StyledForm>
    )
};

export default RegisterModule;

const StyledForm = styled.form`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
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
`;