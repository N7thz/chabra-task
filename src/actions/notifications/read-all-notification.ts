"use server"

import { prisma } from "@/lib/prisma"

type ReadAllNotificationProps = {
	recipientId: string
}

export async function readAllNotification({
	recipientId,
}: ReadAllNotificationProps) {
	return await prisma.notification.updateManyAndReturn({
		where: {
			recipientsId: {
				has: recipientId,
			},
		},
		data: {
			recipientsRead: {
				push: recipientId,
			},
		},
	})
}
