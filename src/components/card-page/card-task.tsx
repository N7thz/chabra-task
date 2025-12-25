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
import { Task } from "@prisma/client"
import { Trash } from "lucide-react"
import { UseFieldArrayRemove, useFormContext } from "react-hook-form"

type CardTaskProps = {
    index: number
    task: Task
    remove: UseFieldArrayRemove
}

export const CardTask = ({
    task: {
        id, name, ownersId
    },
    index,
    remove
}: CardTaskProps) => {

    const { register, setValue, watch } = useFormContext<CreateCardProps>()

    const term = watch(`tasks.${index}.term`)

    return (
        <Card
            key={id}
            className="bg-transparent"
        >
            <CardHeader>
                <CardAction>
                    <Checkbox />
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardTitle className="text-sm">
                    <Input
                        defaultValue={name}
                        {...register(`tasks.${index}.name`)}
                    />
                </CardTitle>
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
                    variant={"secondary"}
                    onClick={() => remove(index)}
                >
                    <Trash />
                    Excluir tarefa
                </Button>
            </CardFooter>
        </Card>
    )
}
