import { FormCreateList } from "@/components/forms/form-create-list"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Home | Stoke App",
}

export default async function Home() {
	return (
		<main className={cn(
			"h-container p-8",
			"max-sm:px-4"
		)}>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button>
						<Plus />
						Adicionar lista
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Adicionar lista
						</AlertDialogTitle>
					</AlertDialogHeader>
					<FormCreateList />
				</AlertDialogContent>
			</AlertDialog>
		</main>
	)
}
