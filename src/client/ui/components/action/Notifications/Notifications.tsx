import { NotificationItem } from "./Notification";
import { Notification, useNotifications } from "./NotificationContext";

export const Notifications = () => {
    const { notifications } = useNotifications();

    return (
        <>
            {notifications.map(({ id, duration, content, type }: Notification) => (
                <NotificationItem
                    key={id}
                    id={id}
                    duration={duration}
                    content={content}
                    type={type}
                />
            ))}
        </>
    );
};