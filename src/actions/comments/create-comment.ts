"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

type CreateCommentsProps = {
	message: string
	cardId: string
}

export async function createComments({ message, cardId }: CreateCommentsProps) {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) throw new Error("O usuário não foi encontrado.")

	const authorId = session.user.id

	return await prisma.comments.create({
		data: {
			message,
			card: {
				connect: {
					id: cardId,
				},
			},
			author: {
				connect: {
					id: authorId,
				},
			},
		},
	})
}
