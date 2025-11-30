import { Product } from "@prisma/client"
import { ReactNode } from "react"

export type LayoutProps = {
	children: ReactNode
}

export type Payload = {
	exp: number
	expires: string
	iat: number
	sub: {
		id: string
		email: string
		imageUrl: string | null
	}
}

export type ResponseProducts<T> = Promise<{
	products: T[]
	count: number
}>

export const itemsLimit = ["10", "25", "30", "40", "50", "100", "all"] as const

export type ItemsLimitProps = "10" | "25" | "30" | "40" | "50" | "100" | "all"
