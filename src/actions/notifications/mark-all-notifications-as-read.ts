"use server"

import { prisma } from "@/lib/prisma"

export async function markAllNotificationsAsRead(userId: string) {
    return await prisma.notificationRecipient.updateMany({
        where: {
            userId,
            deletedAt: null,
            readAt: null,
        },
        data: {
            readAt: new Date(),
        },
    })
}