"use server"

import { prisma } from "@/lib/prisma"
import { connectNotification } from "../notifications/connect-notification"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

type CreateListProps = {
	name: string
	space: string
}

export async function createList({ name, space }: CreateListProps) {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session || !session.user) {
		throw new Error("Usuário não autenticado")
	}

	const notification = await connectNotification({
		notification: {
			message: `Você criou uma nova lista: ${name}`,
			recipientsId: [session.user.id],
		},
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
