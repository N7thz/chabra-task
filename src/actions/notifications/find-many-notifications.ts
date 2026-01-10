"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { findUserById } from "../users/find-user-by-id"

export async function findNotificationsByUserId(
	recipientId: string,
	props: Prisma.NotificationFindManyArgs = {}
) {
	await findUserById(recipientId)

	return await prisma.notification.findMany({
		where: {
			recipients: {
				some: {
					userId: recipientId,
					deletedAt: null
				}
			}
		},
		include: {
			recipients: true
		},
		...props
	})
}
