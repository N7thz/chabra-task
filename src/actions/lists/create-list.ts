"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { createNotification } from "../notifications/create-notification"

type CreateListProps = {
	name: string
	space: string
}

export async function createList({ name, space }: CreateListProps) {

	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		throw new Error("Usuário não autenticado, tente fazer o login novamente.")
	}

	const userId = session.user.id

	const notification = await createNotification({
		userIds: [userId],
		message: `Você criou uma nova lista: ${name}`
	})

	const list = await prisma.list.create({
		data: {
			name,
			space: {
				connect: {
					name: space,
				},
			},
		},
	})

	return { list, notification }
}
