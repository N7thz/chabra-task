import { Card } from "@prisma/client"
import { ReactNode } from "react"

export type LayoutProps = {
	children: ReactNode
}

export type List = {
	id: string
	name: string
	color: string
	createdAt: Date
	updatedAt: Date
	spaceId: string
	cards: Card[]
}