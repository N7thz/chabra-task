import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Notification, NotificationRecipient } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { NotificationsOptionsDialog } from "./notifications-options-dialog"
import { Bookmark, BookmarkCheck } from "lucide-react"

type NotificationWithRecipients = Notification & {
    recipients: NotificationRecipient[]
}

export const NotificationItem = ({
    id,
    message,
    createdAt,
    recipients
}: NotificationWithRecipients) => {

    const { data } = authClient.useSession()

    const myNotification = recipients.find(recipients => recipients.userId === data?.user.id)

    const notificationIsReaded = (
        myNotification !== undefined &&
        myNotification.readAt !== null
    )

    return (
        <Alert
            className={cn(
                "rounded-sm",
                notificationIsReaded
                    ? "bg-secondary border-primary"
                    : "bg-card"
            )}
        >
            {
                notificationIsReaded 
                ? <BookmarkCheck />
                : <Bookmark />
            }
            <AlertTitle className={cn(
                "text-sm flex",
                notificationIsReaded && "line-through"
            )}>
                {message}
            </AlertTitle>
            <AlertAction>
                <NotificationsOptionsDialog
                    notificationId={id}
                    recipients={recipients}
                />
            </AlertAction>
            <AlertDescription className="ml-auto text-xs">
                {formatDate(createdAt, "PPP", { locale: ptBR })}
            </AlertDescription>
        </Alert>
    )
}
