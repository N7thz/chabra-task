import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { FormChangeCardList } from "../forms/form-change-card-to-list"
import { useMutation } from "@tanstack/react-query"
import { duplicateCard } from "@/actions/cards/duplicate-card"
import { toast } from "../toast"
import { queryClient } from "@/providers/theme-provider"
import { Notification } from "@prisma/client"
import { useRouter } from "next/navigation"

type CardOptionsDialogProps = {
	id: string
	listId: string
	space: string
}

export const CardOptionsDialog = ({
	id,
	listId,
	space,
}: CardOptionsDialogProps) => {

	const { push } = useRouter()

	const {
		mutate,
		isPending
	} = useMutation({
		mutationKey: ["duplicate-card"],
		mutationFn: () => duplicateCard(id),
		onSuccess: ({ cardDuplicated, notification }) => {

			toast({
				title: "Cartão duplicado com sucesso",
				description: `Você duplicou o cartão ${cardDuplicated.title}`,
				onAutoClose: () => push(`/space/${space}`)
			})

			queryClient.setQueryData<Notification[]>(
				["find-many-notifications-by-recipient-id"],
				oldData => {

					if (!oldData) return [notification]

					return [...oldData, notification]
				}
			)
		},
		onError: error => {
			toast({
				title: error.name,
				description: error.message,
				variant: "destructive",
			})
		},
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Opções</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Excluir cartão
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => mutate()}>
						Duplicar cartão
					</DropdownMenuItem>
					<FormChangeCardList
						cardId={id}
						listId={listId}
						space={space}
					/>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
