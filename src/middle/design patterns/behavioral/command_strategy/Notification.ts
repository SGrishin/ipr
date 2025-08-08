import { NotificationInfo } from "./NotificationInfo"
import { NotificationType } from "./NotificationType"

export interface Notification {
    send(info: NotificationInfo): void
    getType(): NotificationType
}