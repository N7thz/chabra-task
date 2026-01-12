"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

export async function readNotificationForUser(notificationId: string) {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        throw new Error("Não foi possivel encontrar a sessão, tente logar novamente.")
    }

    const userId = session.user.id

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
