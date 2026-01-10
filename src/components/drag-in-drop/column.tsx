"use client"

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { useDroppable } from "@dnd-kit/core"
import type { CardComplete, List } from "@/types"
import { CardContainer } from "./card-container"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import Link from "next/link"
import { DropdownMenuEditDialog } from "../dropdown-menu-edit-list"

type ColumnProps = {
	list: List
	space: string
}

export function Column({
	space,
	list: { id, name, cards, color },
}: ColumnProps) {
	const { setNodeRef, isOver } = useDroppable({ id })

	return (
		<Card
			ref={setNodeRef}
			className={cn(
				"w-100 h-min pt-0 overflow-hidden transition-colors",
				isOver ? "bg-primary/10" : "bg-muted/50"
			)}>
			<CardHeader
				style={{
					background: color ?? undefined,
				}}
				className="flex items-center justify-between py-4">
				<CardTitle className="font-semibold text-xl">{name}</CardTitle>
				<CardAction>
					<DropdownMenuEditDialog id={id} />
				</CardAction>
			</CardHeader>
			<CardContent className="space-y-4">
				{cards.length === 0 ? (
					<CardDescription>
						Você ainda não possui cartões nesta lista.
					</CardDescription>
				) : (
					cards.map(card => (
						<CardContainer
							key={card.id}
							card={card as CardComplete}
							space={space}
						/>
					))
				)}
			</CardContent>
			<CardFooter>
				<Button asChild className="w-full">
					<Link href={`/${space}/${id}/create-card`}>Adicionar cartão</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
