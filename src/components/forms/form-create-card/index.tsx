"use client"

import { createCard, FormDataCreateCard } from "@/actions/cards/create-card"
import { SpanErrorMessage } from "@/components/span-error"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
    CreateCardProps,
    CreateTaskProps,
    createCardSchema
} from "@/schemas/create-card-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useFieldArray, useForm } from "react-hook-form"
import { SelectOwners } from "./select-owners"
import { SelectPriority } from "./select-priority"
import { SelectStatus } from "./select-status"
import { SelectTerm } from "./select-term"
import { TaskItem } from "./task-item"
import { Priority, Status } from "@prisma/client"

type FormCreateCardProps = { space: string, id: string }

export const FormCreateCard = ({ space, id }: FormCreateCardProps) => {

    const { push } = useRouter()

    const {
        mutate,
        isPending,
        isSuccess
    } = useMutation({
        mutationKey: ["create-card"],
        mutationFn: (
            {
                formData, tasks
            }: {
                tasks: Omit<CreateTaskProps, "id">[],
                formData: FormDataCreateCard
            }
        ) => createCard({ id, tasks, formData }),
        onSuccess: () => {
            toast({
                title: "O cartão foi criado com sucesso.",
                onAutoClose: () => push(`/space/${space}`)
            })
        },
        onError: (error) => {
            toast({
                title: error.name,
                description: error.message,
                variant: "destructive"
            })
        }
    })

    const form = useForm<CreateCardProps>({
        resolver: zodResolver(createCardSchema),
        defaultValues: {
            color: null,
            ownersId: []
        }
    })

    const {
        watch,
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = form

    const {
        append,
        remove,
        fields: tasks
    } = useFieldArray({
        name: "tasks",
        control,
    })

    function appendTasks() {
        append({
            id: "",
            name: "",
            term: new Date(),
            completed: false,
            ownersId: [],
        })
    }

    function onSubmit({ tasks, ...formData }: CreateCardProps) {

        const data = tasks.map(({ id, ...rest }) => rest)

        mutate({ tasks: data, formData })
        // console.log(formData)
    }

    const ownersSelected = watch("ownersId")
    const term = watch("term")

    return (
        <>
            <CardContent>
                <Form {...form}>
                    <form
                        id="form-create-card"
                        onSubmit={handleSubmit(onSubmit)}
                        className={cn(
                            "my-2 space-y-5 grid transition-all",
                            tasks.length === 0
                                ? "grid-cols-1"
                                : "grid-cols-2 gap-4"
                        )}
                    >
                        <div className="space-y-5 w-full">
                            <Label
                                htmlFor="title"
                                className="flex flex-col gap-3"
                            >
                                <span className="self-start">
                                    Título do cartão:
                                </span>
                                <Input
                                    id="title"
                                    {...register("title")}
                                />
                            </Label>
                            {
                                errors.title &&
                                <SpanErrorMessage message={errors.title.message} />
                            }
                            <Label
                                htmlFor="cnpj"
                                className="flex flex-col gap-3"
                            >
                                <span className="self-start">
                                    CNPJ da empresa:
                                </span>
                                <Input
                                    id="cnpj"
                                    {...register("cnpj")}
                                />
                            </Label>
                            {
                                errors.cnpj &&
                                <SpanErrorMessage message={errors.cnpj.message} />
                            }
                            <Label className="flex flex-col gap-3">
                                <span className="self-start">
                                    Status:
                                </span>
                                <SelectStatus
                                    onValueChange={(value) => setValue("status", value as Status)}
                                />
                            </Label>
                            <Label className="flex flex-col gap-3">
                                <span className="self-start">
                                    Prazo:
                                </span>
                                <SelectTerm
                                    date={term}
                                    onDateChange={(date) => setValue("term", date)}
                                />
                            </Label>
                            <Label className="flex flex-col gap-3">
                                <span className="self-start">
                                    Prioridade:
                                </span>
                                <SelectPriority
                                    onValueChange={(value) => setValue("priority", value as Priority)}
                                />
                            </Label>
                            <Label className="flex flex-col gap-3">
                                <span className="self-start">
                                    Responsaveis:
                                </span>
                                <SelectOwners
                                    selected={ownersSelected}
                                    onSelectionChange={(value) => setValue("ownersId", value)}
                                />
                            </Label>
                            <Label
                                htmlFor="description"
                                className="flex flex-col gap-3"
                            >
                                <span className="self-start">
                                    Observações:
                                </span>
                                <Textarea
                                    id="description"
                                    {...register("description")}
                                    className="max-h-50"
                                />
                            </Label>
                        </div>
                        <ScrollArea className={cn(
                            tasks.length !== 0 &&
                            "h-[500px]"
                        )}>
                            <ScrollBar />
                            {
                                tasks.length !== 0 &&
                                <div className="size-full space-y-4">
                                    {
                                        tasks.map((task, index) => (
                                            <TaskItem
                                                key={task.id}
                                                index={index}
                                                remove={remove}
                                            />
                                        ))
                                    }
                                </div>
                            }
                        </ScrollArea>
                    </form>
                </Form>
                <div className="w-full flex justify-end">
                    <Button
                        type="button"
                        variant={"secondary"}
                        className="w-1/2"
                        onClick={appendTasks}
                    >
                        Adicionar tarefas
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="gap-4 justify-end">
                <Button
                    type="submit"
                    form="form-create-card"
                    className="w-1/2"
                    disabled={isPending || isSuccess}
                >
                    {
                        (isPending || isSuccess)
                            ? <Spinner />
                            : "Confirmar"
                    }
                </Button>
            </CardFooter>
        </>
    )
}