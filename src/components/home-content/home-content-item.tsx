import {
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Card as UICard,
} from "@/components/ui/card"
import { getDeadlineDays } from "@/functions/get-dead-line-days"
import { cn } from "@/lib/utils"
import { Card, Priority, Status } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock } from "lucide-react"
import Link from "next/link"
import { AvatarGroup } from "../avatar-group"

export const HomeContentItem = ({
	card: { id, title, createdAt, ownersId, ...rest },
}: {
	card: Card
}) => {
	function getStatusBadge(status: Status) {
		const map = {
			COMPLETED: {
				text: "concluído",
				color: "bg-green-500",
			},
			IN_PROGRESS: {
				text: "em andamento",
				color: "bg-yellow-500",
			},
			PENDING: {
				text: "pendente",
				color: "bg-red-500",
			},
		} as const

		return map[status]
	}

	function getPriorityBadge(priority: Priority) {
		const map = {
			URGENT: {
				text: "urgente",
				color: "bg-red-600",
			},
			HIGH: {
				text: "alta",
				color: "bg-orange-500",
			},
			MID: {
				text: "média",
				color: "bg-yellow-500",
			},
			LOW: {
				text: "baixa",
				color: "bg-green-500",
			},
		} as const

		return map[priority]
	}

	const status = getStatusBadge(rest.status)
	const priority = getPriorityBadge(rest.priority)
	const term = getDeadlineDays(rest.term)

	return (
		<UICard key={id} className="justify-between">
			<CardHeader className="group">
				<Link href={`/cards/${id}`}>
					<CardTitle className="group-hover:underline">{title}</CardTitle>
				</Link>
				<CardDescription className="flex gap-2 items-center text-primary my-2">
					<Clock className="size-3.5" />
					Criado em:
					<span>
						{formatDate(createdAt, "dd 'de' MMM 'de' yyyy 'às' HH:mm", {
							locale: ptBR,
						})}
					</span>
				</CardDescription>
				<CardDescription className="flex gap-2 items-center text-primary  w-fit py-2 px-4 rounded-md border-2">
					<Clock className="size-3.5" />
					Prazo:
					<span>
						{formatDate(rest.term, "dd 'de' MMM", {
							locale: ptBR,
						})}
					</span>
					{
						term.status === "OVERDUE"
							? (
								<span className="bg-red-500 py-0.5 px-1 rounded-sm">
									{term.text}
								</span>
							)
							: (
								<span className="bg-green-600 py-0.5 px-1 rounded-sm">
									{term.days} restantes
								</span>
							)
					}
				</CardDescription>
				<CardAction>
					<AvatarGroup usersId={ownersId} />
				</CardAction>
			</CardHeader>
			<CardFooter className="gap-2">
				{[status, priority].map(({ color, text }) => (
					<div
						key={text}
						className={cn("w-fit text-sm rounded-md p-2", color)}
					>
						{text}
					</div>
				))}
			</CardFooter>
		</UICard>
	)
}
