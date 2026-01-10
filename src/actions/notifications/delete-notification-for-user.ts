"use server"

import { prisma } from "@/lib/prisma"

type DeleteNotificationForUserProps = {
    notificationId: string
    userId: string
}

export async function deleteNotificationForUser({
    notificationId, userId
}: DeleteNotificationForUserProps) {
    return await prisma.notificationRecipient.update({
        where: {
            notificationId_userId: {
                notificationId,
                userId
            }
        },
        data: {
            deletedAt: new Date()
        }
    })
}
