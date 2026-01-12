import {
    deleteNotificationForUser
} from "@/actions/notifications/delete-notification-for-user"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { queryClient } from "@/providers/theme-provider"
import { useMutation } from "@tanstack/react-query"
import { toast } from "../toast"

export const DeleteNotificationButton = ({
    notificationId
}: { notificationId: string }) => {

    const {
        mutate,
        isPending,
    } = useMutation({
        mutationKey: ["delete-notification", notificationId],
        mutationFn: () => deleteNotificationForUser(notificationId),
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
            Excluir
        </DropdownMenuItem>
    )
}
