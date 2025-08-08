import { NotificationController } from "./NotificationController"
import { NotificationService } from "./NotificationService"
import { EmailNotification } from "./EmailNotification"
import { SMSNotification } from "./SMSNotification"
import { TelegramNotification } from "./TelegramNotification"
import { WhatsAppNotification } from "./WhatsAppNotification"
import { NotificationInfo } from "./NotificationInfo"
import { NotificationType } from "./NotificationType"

function app() {
    const emailInfo = new NotificationInfo(NotificationType.EMAIL, "email message")
    const smsInfo = new NotificationInfo(NotificationType.SMS, "sms message")
    const telegramInfo = new NotificationInfo(NotificationType.TELEGRAM, "telegram message")
    const whatsappInfo = new NotificationInfo(NotificationType.WHATSAPP, "whatsapp message")
    const service = new NotificationService([
        new EmailNotification(),
        new SMSNotification(),
        new TelegramNotification(),
        new WhatsAppNotification()
    ])
    const controller = new NotificationController(service)

    controller.sendNotification(emailInfo)
    controller.sendNotification(smsInfo)
    controller.sendNotification(telegramInfo)
    controller.sendNotification(whatsappInfo)
}

app()