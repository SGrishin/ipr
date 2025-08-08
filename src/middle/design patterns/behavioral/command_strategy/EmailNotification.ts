import { Notification } from "./Notification"
import { NotificationInfo } from "./NotificationInfo"
import { NotificationType } from "./NotificationType"

export class EmailNotification implements Notification {
    send(info: NotificationInfo): void {
        console.log(`Отправляем сообщение ${info.getMessage()} электронной почтой`);
        console.log("Дюже большая логика..");
    }

    getType(): NotificationType {
        return NotificationType.EMAIL
    }
}