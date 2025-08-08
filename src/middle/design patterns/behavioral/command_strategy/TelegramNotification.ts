import { Notification } from "./Notification"
import { NotificationInfo } from "./NotificationInfo"
import { NotificationType } from "./NotificationType"

export class TelegramNotification implements Notification {
    send(info: NotificationInfo): void {
        console.log(`Отправляем сообщение ${info.getMessage()} в телеграм`);
        console.log("Дюже большая логика..");
    }

    getType(): NotificationType {
        return NotificationType.TELEGRAM
    }
}