import { createContext, ReactNode, useContext, useState } from 'react';

export interface Notification {
    id: string;
    duration?: number;
    content: ReactNode | string;
    type?: 'error' | 'success';
}

interface NotificationsContextType {
    notifications: Notification[];
    addNotification: (content: ReactNode, type: 'success' | 'error', duration?: number) => void;
    destroyNotification: (id: string) => void;
}

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationsProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (
        content: ReactNode,
        type: 'success' | 'error' = 'success',
        duration: number = 3000
    ) => {
        setNotifications(prev => [
            ...prev,
            { id: Date.now().toString(), content, type, duration }
        ]);
    };

    const destroyNotification = (id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    return (
        <NotificationsContext.Provider value={{ notifications, addNotification, destroyNotification }}  >
            {children}
        </NotificationsContext.Provider>
    );
};