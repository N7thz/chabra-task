"use server"

import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { createNotification } from "../notifications/create-notification"

export async function createSpace(name: string) {
	
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		throw new Error("Usuário não autenticado")
	}

	const space = await prisma.space.findUnique({
		where: {
			name,
		},
	})

	if (space) {
		throw new Error("Espaço já existe", {
			cause:
				"Você está tentado cadatrar um novo cartão com um nome que já existe em uma lista.",
		})
	}

	const userId = session.user.id

	const notification = await createNotification({
		message: `Você criou um novo espaço: ${name}`,
		userIds: [userId]
	})

	const spaceCreated = await prisma.space.create({
		data: {
			name,
		},
	})

	return { spaceCreated, notification }
}
