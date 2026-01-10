"use server"

import { prisma } from "@/lib/prisma"
import { connectNotification } from "../notifications/connect-notification"
import { authClient } from "@/lib/auth-client"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function createSpace(name: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session || !session.user) {
		throw new Error("Usuário não autenticado")
	}

	const space = await prisma.space.findUnique({
		where: {
			name,
		},
	})

	if (space)
		throw new Error("Espaço já existe", {
			cause:
				"Você está tentado cadatrar um novo cartão com um nome que já existe em uma lista.",
		})

	const notification = await connectNotification({
		notification: {
			message: `Você criou um novo espaço: ${name}`,
			recipientsId: [session.user.id],
		},
	})

	const spaceCreated = await prisma.space.create({
		data: {
			name,
		},
	})

	return { spaceCreated, notification }
}
