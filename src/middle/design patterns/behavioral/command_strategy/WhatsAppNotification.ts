import { Notification } from "./Notification"
import { NotificationInfo } from "./NotificationInfo"
import { NotificationType } from "./NotificationType"

export class WhatsAppNotification implements Notification {
    send(info: NotificationInfo): void {
        console.log(`Отправляем сообщение ${info.getMessage()} в вотсап`);
        console.log("Дюже большая логика..");
    }

    getType(): NotificationType {
        return NotificationType.WHATSAPP
    }
}