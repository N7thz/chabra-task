import type {
	Activity,
	Comments,
	Priority,
	Status,
	Task,
	User
} from "@prisma/client"
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

export type Card = {
	id: string
	title: string
	cnpj: string
	description: string
	status: string
	term: Date
	color: string | null
	createdAt: Date
	completedAt: Date | null
	updatedAt: Date
	labelId: string
	priority: "HIGH" | "MEDIUM" | "LOW"
	listId: string
	owner: User[]        // pode tipar melhor se quiser
	tasks: Task[]        // idem
}

export type CardComplete = {
	id: string
	title: string
	cnpj: string
	description: string
	term: Date
	color: string | null
	createdAt: Date
	completedAt: Date | null
	updatedAt: Date
	labelId: string | null
	ownersId: string[]
	priority: Priority
	status: Status
	listId: string
	activities: Activity[]
	comments: Comments[]
	tasks: Task[]
}

export interface CardTest {
	id: string
	title: string
	description?: string
	priority: "low" | "medium" | "high"
}

export interface Column {
	id: string
	title: string
	cards: CardTest[]
}

export type ListWithCards = List & {
	cards: Card[]
}