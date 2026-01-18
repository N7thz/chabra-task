"use client"

import { deleteCard } from "@/actions/cards/delete-card-by-id"
import { findCardById } from "@/actions/cards/find-card-by-id"
import { toast } from "@/components/toast"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import { queryClient } from "@/providers/theme-provider"
import { Notification } from "@prisma/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { useState } from "react"

export const DeleteCardDialog = ({ cardId }: { cardId: string }) => {

	const [open, setOpen] = useState(false)

	const {
		data: card,
	} = useQuery({
		queryKey: ["find-card-by-id", cardId],
		queryFn: () => findCardById(cardId)
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ["delete-card-by-id"],
		mutationFn: () => deleteCard(cardId),
		onSuccess: ({ cardDeleted, notification }) => {
			toast({
				title: `O cartão ${cardDeleted.title} foi excluido com sucesso.`,
				onAutoClose: () => {
					setOpen(false)
					redirect("/home")
				},
			})

			queryClient.setQueryData<Notification[]>(
				["find-many-notifications-by-recipient-id"],
				oldData => {

					if (!oldData) return [notification]

					return [...oldData, notification]
				}
			)
		},
		onError: err => {
			toast({
				title: err.name,
				description: err.message,
				variant: "destructive",
			})
		},
	})

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem onSelect={e => e.preventDefault()}>
					Excluir cartão
				</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogContent className="sm:min-w-120 space-y-5">
				<AlertDialogHeader>
					<AlertDialogTitle>
						Excluir cartão?
					</AlertDialogTitle>
					<AlertDialogDescription className="text-base text-primary">
						Tem certeza que deseja excluir o cartão:
						<span className="font-extrabold ml-2 underline">
							{card?.title}
						</span>? <br />
						<span className="text-destructive pt-2 font-extrabold">
							Essa ação não pode ser revertida
						</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						type="button"
						variant="destructive"
						className="w-1/2">
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						type="submit"
						variant="default"
						className="w-1/2"
						onClick={() => mutate()}
					>
						{isPending ? <Spinner /> : "Confirmar"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
