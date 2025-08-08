import { Notification } from "./Notification"
import { NotificationInfo } from "./NotificationInfo"

export class NotificationService {
    private notificationMap: Map<ReturnType<Notification["getType"]>, Notification> = new Map()
    constructor (notifications: Array<Notification>) {
        notifications.forEach((notification) => {
            this.notificationMap.set(notification.getType(), notification)
        })
    }

    send(info: NotificationInfo): void {
        const notification = this.notificationMap.get(info.getType())

        notification?.send(info)
    }
}