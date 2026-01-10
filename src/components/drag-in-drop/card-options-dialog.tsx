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
import { useRouter } from "next/navigation"
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
	const { push } = useRouter()

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
					<DropdownMenuItem onClick={() => push(`/${space}/card/${id}`)}>
						Abrir cartão
					</DropdownMenuItem>
					<DropdownMenuItem>Excluir cartão</DropdownMenuItem>
					<FormChangeCardList cardId={id} listId={listId} space={space} />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
