"use server"

import { prisma } from "@/lib/prisma"

type ReadNotificationByIdProps = {
	notificationId: string
	recipientId: string
}

export async function readNotificationById({ 
	notificationId, recipientId 
}: ReadNotificationByIdProps) {
	return await prisma.notification.update({
		where: {
			id: notificationId
		},
		data: {
			recipientsRead: {
				push: recipientId
			}
		},
	})
}