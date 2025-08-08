import { Notification } from "./Notification"
import { NotificationInfo } from "./NotificationInfo"
import { NotificationType } from "./NotificationType"

export class SMSNotification implements Notification {
    send(info: NotificationInfo): void {
        console.log(`Отправляем сообщение ${info.getMessage()} sms`);
        console.log("Дюже большая логика..");
    }

    getType(): NotificationType {
        return NotificationType.SMS
    }
}