import {
    CardCommentsActivity
} from "@/components/card-page/card-comments-activity"
import { CardInfoTask } from "@/components/card-page/card-info-task"
import { Button } from "@/components/ui/button"
import {
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useLoading } from "@/providers/loading-provider"
import { CreateCardProps, createCardSchema } from "@/schemas/create-card-schema"
import { CardComplete } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, Ellipsis } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"

export const FormUpdateCard = ({
    card
}: { card: CardComplete }) => {

    const { startLoading, stopLoading } = useLoading()

    const {
        id,
        title,
        description,
        priority,
        status,
        ownersId,
        tasks,
        createdAt,
        cnpj,
        activities,
        comments
    } = card

    const form = useForm({
        resolver: zodResolver(createCardSchema),
        defaultValues: {
            ...card,
            tasks: tasks.map(task => ({
                ...task,
                term: task.term ?? undefined,
            }))
        }
    })

    const { handleSubmit, formState: { errors } } = form

    if (errors) {
        console.log(errors)
    }

    async function onSubmit(data: CreateCardProps) {

        console.log(data)

        startLoading()

        await new Promise(resolve => setTimeout(resolve, 3000))

        stopLoading()
    }

    return (
        <FormProvider {...form}>
            <form
                id="form-update-card"
                onSubmit={handleSubmit(onSubmit)}
            >
                <CardHeader className="space-y-1 mb-2">
                    <CardAction>
                        <Button variant={"ghost"}>
                            <Ellipsis />
                        </Button>
                    </CardAction>
                    <CardTitle>
                        <Input
                            defaultValue={title}
                            className="w-2/3"
                        />
                    </CardTitle>
                    <CardDescription className="text-primary">
                        <Input
                            defaultValue={cnpj}
                            className="w-2/3"
                        />
                    </CardDescription>
                    <CardDescription className="flex gap-2 items-center text-primary my-2">
                        <Clock className="size-3.5" />
                        Criado em:
                        <span>
                            {
                                formatDate(
                                    createdAt,
                                    "dd 'de' MMM 'de' yyyy 'às' HH:mm",
                                    { locale: ptBR }
                                )
                            }
                        </span>
                    </CardDescription>

                </CardHeader>
                <CardContent className="flex space-x-4">
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="size-full rounded-lg border"
                    >
                        <ResizablePanel
                            defaultSize={70}
                            minSize={30}
                            className="size-full"
                        >
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
    )
}
