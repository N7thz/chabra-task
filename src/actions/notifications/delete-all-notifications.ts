"use server"

import { prisma } from "@/lib/prisma"

export async function deleteAllNotifications(userId: string) {
    return await prisma.notificationRecipient.updateMany({
        where: {
            userId,
            deletedAt: null,
        },
        data: {
            deletedAt: new Date(),
        },
    })
}