import { Board } from "@/components/drag-in-drop/board"
import { FormCreateList } from "@/components/forms/form-create-list"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Ellipsis, Plus } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Home | Stoke App",
}

export default async function Home({
	params
}: { params: Promise<{ space: string }> }) {

	const { space } = await params

	return (
		<ScrollArea className="h-dvh w-[1560px]">
			<ScrollBar orientation="horizontal" className="-translate-y-4" />
			<Card className="mt-2 mx-4 pt-4 pb-2">
				<CardHeader className="px-4 w-full">
					<CardTitle className="capitalize whitespace-nowrap text-lg">
						{decodeURI(space)}
					</CardTitle>
					<CardAction>
						<Button>
							<Ellipsis />
						</Button>
					</CardAction>
				</CardHeader>
			</Card>
			<main className={cn("flex flex-nowrap p-4 gap-4", "max-sm:px-4")}>
				<Board />
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button>
							<Plus />
							Adicionar lista
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="w-1/2">
						<AlertDialogHeader>
							<AlertDialogTitle>Adicionar lista</AlertDialogTitle>
						</AlertDialogHeader>
						<FormCreateList />
					</AlertDialogContent>
				</AlertDialog>
			</main>
		</ScrollArea>
	)
}
