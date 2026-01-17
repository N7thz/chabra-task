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
					<DropdownMenuItem>
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
