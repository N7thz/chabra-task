import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { DeleteNotificationButton } from "./delete-notification-button"
import { ReadNotificationButton } from "./read-notification-button"
import { NotificationRecipient } from "@prisma/client"
import { authClient } from "@/lib/auth-client"

type NotificationsOptionsDialogProps = {
    notificationId: string
    recipients: NotificationRecipient[]
}

export const NotificationsOptionsDialog = ({
    notificationId,
    recipients
}: NotificationsOptionsDialogProps) => {

    const { data } = authClient.useSession()

    const myNotification = recipients.find(recipients => recipients.userId === data?.user.id)

    const notificationIsReaded = (
        myNotification !== undefined &&
        myNotification.readAt !== null
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Opções
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {
                        !notificationIsReaded &&
                        <ReadNotificationButton
                            notificationId={notificationId}
                            recipients={recipients}
                        />
                    }
                    <DeleteNotificationButton notificationId={notificationId} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
