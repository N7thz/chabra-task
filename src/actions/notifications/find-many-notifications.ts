"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { findUserById } from "../users/find-user-by-id"

export async function findNotificationsyUserId(
	recipientId: string,
	props: Prisma.NotificationFindManyArgs = {}
) {

	await findUserById(recipientId)

	const notifications = await prisma.notification.findMany({
		where: {
			recipientsId: {
				has: recipientId
			}
		},
		...props
	})

	return notifications
}