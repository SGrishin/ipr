import { NotificationType } from "./NotificationType"

export class NotificationInfo {
    private message: string
    private type: NotificationType

    constructor (
        type: NotificationType,
        message: string,
    ) {
        this.type = type
        this.message = message
    }

    getType(): NotificationType {
        return this.type
    }

    getMessage(): string {
        return this.message
    }
}