import {
    readNotificationForUser
} from "@/actions/notifications/read-notification-for-user"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { queryClient } from "@/providers/theme-provider"
import { NotificationRecipient } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "../toast"

type ReadNotificationButtonProps = {
    notificationId: string,
    recipients: NotificationRecipient[]
}

export const ReadNotificationButton = ({
    notificationId,
    recipients
}: ReadNotificationButtonProps) => {

    const {
        mutate,
        isPending,
    } = useMutation({
        mutationKey: ["read-notification", notificationId],
        mutationFn: () => readNotificationForUser(notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["find-many-notifications-by-recipient-id"]
            })
        },
        onError: err => {
            toast({
                title: err.name,
                description: err.message,
                variant: "destructive",
            })
        },
    })

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => mutate()}
        >
            Marcar como lida
        </DropdownMenuItem>
    )
}
