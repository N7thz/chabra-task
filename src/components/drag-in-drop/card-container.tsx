import { Button } from "@/components/ui/button"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Card as CardPorps } from "@prisma/client"
import { Task } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, GripHorizontal } from "lucide-react"
import Link from "next/link"
import { AvatarGroup } from "../avatar-group"
import { CardOptionsDialog } from "./card-options-dialog"
import { SortableCard } from "./sortable-card"
import { CardComplete } from "@/types"

const images: string[] = [
	"https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80",
	"https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80",
	"https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=96&h=96&dpr=2&q=80",
]

export const CardContainer = ({
	space,
	card: { id, title, description, term, listId, tasks = [] },
}: {
	card: CardComplete
	space: string
}) => {
	const tasksCompleteds = tasks.filter(task => task.completed).length

	function getCompletedPercentage(tasks: Task[]) {
		if (tasks.length === 0) return 0

		const completedCount = tasks.filter(t => t.completed).length

		return (completedCount / tasks.length) * 100
	}

	return (
		<Card className="pt-2.5 gap-1.5 overflow-hidden">
			<CardHeader className="pb-0">
				<Button variant={"ghost"} className="size-full">
					<SortableCard
						id={id}
						className="size-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
						<GripHorizontal className="size-6" />
					</SortableCard>
				</Button>
			</CardHeader>
			<Separator className="bg-border/60" />
			<CardHeader className="pt-6">
				<CardAction>
					<CardOptionsDialog id={id} listId={listId!} space={space} />
				</CardAction>
				<Link
					title={`Ir para o card ${title}`}
					href={`/cards/${id}`}
					className="contents size-full cursor-pointer group">
					<CardTitle className={cn("text-base", "group-hover:underline")}>
						{title}
					</CardTitle>
				</Link>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent className="space-y-5 pt-6">
				<div className="flex justify-between">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Clock className="size-3" />
						{formatDate(term, "dd 'de' MMM", { locale: ptBR })}
					</div>
					<AvatarGroup images={images} />
				</div>
				<div className="space-y-2.5">
					<div className="text-sm">
						{tasksCompleteds} de {tasks.length}
					</div>
					<Progress value={getCompletedPercentage(tasks)} />
				</div>
			</CardContent>
		</Card>
	)
}
