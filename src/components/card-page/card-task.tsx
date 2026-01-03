import { changeCompletedTask } from "@/actions/tasks/change-state-task"
import { SelectOwners } from "@/components/forms/form-create-card/select-owners"
import { SelectTerm } from "@/components/forms/form-create-card/select-term"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { CreateCardProps } from "@/schemas/create-card-schema"
import { queryKeys } from "@/utils/query-keys"
import { Task } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { Trash } from "lucide-react"
import { UseFieldArrayRemove, useFormContext } from "react-hook-form"
import { queryClient } from "@/providers/theme-provider"
import { toast } from "@/components/toast"
import { cn } from "@/lib/utils"
import { CreateTaskProps } from "@/schemas/create-card-schema"

type CardTaskProps = {
    index: number
    task: CreateTaskProps
    remove: UseFieldArrayRemove
}

export const CardTask = ({
    task: {
        id, name, completed
    },
    index,
    remove
}: CardTaskProps) => {

    const { register, setValue, watch } = useFormContext<CreateCardProps>()

    const term = watch(`tasks.${index}.term`)
    const ownersId = watch(`tasks.${index}.ownersId`)

    const { mutate } = useMutation({
        mutationKey: ["change-completed-task"],
        mutationFn: (completed: boolean) => changeCompletedTask({
            id,
            completed
        }),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.card.find(id)
            })
        },
        onError: (err) => {
            toast({
                title: err.name,
                description: err.message,
                variant: "destructive"
            })
        }
    })

    return (
        <Card className={cn(
            "my-4 transition-all",
            completed
                ? "bg-muted border-primary/60"
                : "bg-transparent"
        )}>
            <CardHeader className="items-center justify-center">
                <CardAction className="row-span-3">
                    <Checkbox
                        type="button"
                        defaultChecked={completed}
                        className="scale-150 translate-y-2 translate-x-1"
                        onCheckedChange={(value) => {

                            const checked = value === true

                            console.log(checked)

                            setValue(`tasks.${index}.completed`, checked)

                            mutate(checked)
                        }}
                    />
                </CardAction>
                <CardTitle className="text-sm">
                    <Input
                        defaultValue={name}
                        className={cn(completed && "line-through")}
                        {...register(`tasks.${index}.name`)}
                    />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <SelectTerm
                    date={term ?? undefined}
                    onDateChange={(date) => setValue(`tasks.${index}.term`, date)}
                />
                <SelectOwners
                    selected={ownersId}
                    onSelectionChange={(value) => setValue(`tasks.${index}.ownersId`, value)}
                />
            </CardContent>
            <CardFooter className="justify-end">
                <Button
                    type="button"
                    variant={completed ? "default" : "secondary"}
                    onClick={() => remove(index)}
                >
                    <Trash />
                    Excluir tarefa
                </Button>
            </CardFooter>
        </Card>
    )
}
