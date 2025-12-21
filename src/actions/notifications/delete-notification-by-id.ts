"use server"

import { prisma } from "@/lib/prisma"

type DeleteNotificationByIdProps = {
	notificationId: string
	recipientId: string
}

export async function deleteNotificationById({ 
	notificationId,
	recipientId 
}: DeleteNotificationByIdProps) {
	return await prisma.notification.update({
		where: {
			id: notificationId
		},
		data: {
			recipientsDeleted: {
				push: recipientId
			}
		}
	})
}