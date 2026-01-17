import { updateCard } from "@/actions/cards/update-card"
import {
	CardCommentsActivity
} from "@/components/card-page/card-comments-activity"
import { CardInfoTask } from "@/components/card-page/card-info-task"
import { queryClient } from "@/providers/theme-provider"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import {
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Spinner } from "@/components/ui/spinner"
import {
	CreateCardProps,
	createCardSchema,
	CreateTaskProps,
} from "@/schemas/create-card-schema"
import { CardComplete } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma } from "@prisma/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, Ellipsis } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { CardOptionsDialog } from "@/components/card-page/card-options-dialog"
import { findSpaceByListId } from "@/actions/spaces/find-space-by-list-id"

export const FormUpdateCard = ({ card }: { card: CardComplete }) => {

	const { back } = useRouter()

	const {
		id,
		title,
		tasks,
		createdAt,
		cnpj,
		activities,
		comments,
		listId,
	} = card

	const {
		data: space,
		isLoading
	} = useQuery({
		queryKey: ["find-space-by-list-id"],
		queryFn: () => findSpaceByListId(listId, {
			select: {
				name: true
			}
		})
	})

	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ["form-edit-card"],
		mutationFn: ({
			card,
			tasks,
		}: {
			card: Prisma.CardUpdateInput
			tasks: (CreateTaskProps & {
				id: string
			})[]
		}) => updateCard({ id, card, tasks }),
		onSuccess: ({ id }) => {
			toast({
				title: `O cartão ${title} foi atualizado com sucesso`,
				onAutoClose: back,
			})

			queryClient.invalidateQueries({
				queryKey: ["find-card-by-id", id],
			})
		},
		onError: error => {
			console.error("Erro ao atualizar cartão:", error)

			toast({
				title: "Erro ao autualizar cartão",
				description:
					"Ocorreu um erro ao atualizar cartão. Por favor, tente novamente.",
				variant: "destructive",
			})
		},
	})

	const form = useForm({
		resolver: zodResolver(createCardSchema),
		defaultValues: {
			...card,
			tasks: tasks.map(task => ({
				...task,
				term: task.term ?? undefined,
			})),
		},
	})

	const {
		register,
		handleSubmit,
	} = form

	async function onSubmit({ tasks, ...card }: CreateCardProps) {
		console.log(tasks)

		mutate({ card, tasks })
	}

	return (
		<>
			<FormProvider {...form}>
				<form
					id="form-update-card"
					onSubmit={handleSubmit(onSubmit)}
				>
					<CardHeader className="space-y-1 mb-2">
						<CardAction>
							{
								!space || isLoading
									? (
										<Button disabled variant="ghost">
											<Ellipsis />
										</Button>
									)
									: (
										<CardOptionsDialog
											id={id}
											listId={listId}
											space={space.name}
										/>
									)
							}
						</CardAction>
						<CardTitle>
							<Input
								defaultValue={title}
								className="w-2/3"
								{...register("title")}
							/>
						</CardTitle>
						<CardDescription className="text-primary">
							<Input
								defaultValue={cnpj}
								className="w-2/3"
								{...register("cnpj")}
							/>
						</CardDescription>
						<CardDescription className="flex gap-2 items-center text-primary my-2">
							<Clock className="size-3.5" />
							Criado em:
							<span>
								{formatDate(createdAt, "dd 'de' MMM 'de' yyyy 'às' HH:mm", {
									locale: ptBR,
								})}
							</span>
						</CardDescription>
					</CardHeader>
					<CardContent className="flex space-x-4">
						<ResizablePanelGroup
							direction="horizontal"
							className="size-full rounded-lg border">
							<ResizablePanel
								defaultSize={70}
								minSize={30}
								className="size-full">
								<CardInfoTask card={card} />
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel defaultSize={30}>
								<CardCommentsActivity
									id={id}
									activities={activities}
									comments={comments}
								/>
							</ResizablePanel>
						</ResizablePanelGroup>
					</CardContent>
				</form>
			</FormProvider>
			<CardFooter className="justify-end">
				<Button
					type="submit"
					form="form-update-card"
					className="w-1/2"
					disabled={isPending || isSuccess}>
					{isPending || isSuccess ? <Spinner /> : "Salvar alterações"}
				</Button>
			</CardFooter>
		</>
	)
}
