import { Board } from "@/components/drag-in-drop/board"
import { FormCreateList } from "@/components/forms/form-create-list"
import { ListContainer } from "@/components/list-container"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Home | Stoke App",
}

export default async function Home({
	params,
}: {
	params: Promise<{ space: string }>
}) {

	const space =  decodeURI((await params).space)

	return (
		<ScrollArea className="h-dvh w-[1560px]">
			<ScrollBar
				orientation="horizontal"
				className="-translate-y-4"
			/>
			<main className={cn(
				"flex flex-nowrap p-8 gap-4",
				"max-sm:px-4"
			)}>
				<Board space={space} />
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button>
							<Plus />
							Adicionar lista
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="w-1/2">
						<AlertDialogHeader>
							<AlertDialogTitle>
								Adicionar lista
							</AlertDialogTitle>
						</AlertDialogHeader>
						<FormCreateList />
					</AlertDialogContent>
				</AlertDialog>
			</main>
		</ScrollArea>
	)
}
