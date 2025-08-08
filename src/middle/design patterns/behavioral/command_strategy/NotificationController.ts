import { NotificationService } from "./NotificationService"
import { NotificationInfo } from "./NotificationInfo"

export class NotificationController {
    constructor( private service: NotificationService ) {}

    sendNotification(info: NotificationInfo) {
        this.service.send(info)
    }
}