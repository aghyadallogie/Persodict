import { Check } from "@/client/ui/assets/images/icons/Check";
import { Wrong } from "@/client/ui/assets/images/icons/Wrong";
import { P } from "@/client/ui/components/layout/Text";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNotifications } from "./NotificationContext";
import type { Notification } from "./NotificationContext";

export const NotificationItem = ({ id, duration = 1000, content, type = 'success' }: Notification) => {
    const { destroyNotification } = useNotifications();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const timeout = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => destroyNotification(id as string), 500);
        }, duration);

        return () => clearTimeout(timeout);
    }, [id, destroyNotification, duration]);

    return (
        <Wrapper $isVisible={isVisible}>
            <IconWrap>
                {type === 'success' && <Check width={64} height={64} color="#239a23" />}
                {type === 'error' && <Wrong width={64} height={64} color="#d75b5b" />}
            </IconWrap>
            <P>{content}</P>
        </Wrapper>
    );
};

const Wrapper = styled.div<{ $isVisible: boolean }>`
    opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
    transition: opacity 0.5s ease-in-out;
    animation: slideUp 0.5s forwards;
    position: fixed;
    top: 15%;
    left: 47.7%;
    transform: translate(-50%, -50%);

    @media (max-width: 768px) {
        top: 30%;
        left: 40%;
    }

    @keyframes slideUp {
        0% {
            transform: translateY(20px);
        }
        100% {
            transform: translateY(0);
        }
    }
`;

const IconWrap = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.pageBackground};
    border-radius: 50%;
    display: flex;
    justify-content: center;
`;