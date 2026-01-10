"use server"

import { prisma } from "@/lib/prisma"

type CreateNotificationProps = {
    userIds: string[],
    message: string
}

export async function createNotification({
    message, userIds
}: CreateNotificationProps) {
    return await prisma.notification.create({
        data: {
            message,
            recipients: {
                createMany: {
                    data: userIds.map(userId => ({ userId }))
                }
            }
        }
    })
}