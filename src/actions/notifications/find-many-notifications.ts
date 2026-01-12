"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { findUserById } from "../users/find-user-by-id"

export type ReadFilter = "all" | "read" | "unread"

export async function findNotificationsByUserId<T>(
	recipientId: string,
	options?: {
		includeDeleted?: boolean
		read?: ReadFilter
		props?: Prisma.NotificationFindManyArgs
	}
) {
	const {
		includeDeleted = false,
		read = "all",
		props = {}
	} = options ?? {}

	await findUserById(recipientId)

	return await prisma.notification.findMany({
		where: {
			recipients: {
				some: {
					userId: recipientId,

					// filtro de deletadas (soft delete)
					...(includeDeleted ? {} : { deletedAt: null }),

					// filtro de lidas / não lidas
					...(read === "read"
						? { readAt: { not: null } }
						: read === "unread"
							? { readAt: null }
							: {})
				}
			}
		},
		include: {
			recipients: true
		},
		...props
	}) as T
}