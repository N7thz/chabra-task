"use server"

import { prisma } from "@/lib/prisma"
import { findUserById } from "../users/find-user-by-id"
import { th } from "date-fns/locale"
import { Prisma } from "@prisma/client"

type ConnectNotificationProps = {
    notification: Prisma.NotificationCreateInput & {
        recipientsId: string[],
    }
}

export async function connectNotification({
    notification
}: ConnectNotificationProps) {

    const recipientsExist: string[] = []

    const { recipientsId } = notification

    for (const recipientId of recipientsId) {

        const recipient = await findUserById(recipientId)

        if (!recipient) {
            throw new Error("O usuário destinatário não foi encontrado.")
        }

        recipientsExist.push(recipient.id)
    }

    return await prisma.notification.create({
        data: {
            ...notification,
            recipientsId: recipientsExist,
        }
    })
}