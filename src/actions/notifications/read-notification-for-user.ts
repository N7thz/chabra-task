"use server"

import { prisma } from "@/lib/prisma"

type ReadNotificationForUserProps = {
    notificationId: string
    userId: string
}

export async function deleteNotificationForUser({
    notificationId, userId
}: ReadNotificationForUserProps) {
    return await prisma.notificationRecipient.update({
        where: {
            notificationId_userId: {
                notificationId,
                userId
            }
        },
        data: {
            readAt: new Date()
        }
    })
}
