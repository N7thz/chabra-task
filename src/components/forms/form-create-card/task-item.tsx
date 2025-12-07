import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { SelectTaskOwners } from "./select-task-owners"
import { SelectTaskTerm } from "./select-task-term"
import { CreateCardProps } from "@/schemas/create-card-schema"

type Task = {
    id: string
    name: string
    term: Date
    completed: boolean
    ownersId: string[]
}

type TaskItemProps = {
    task: Task,
    index: number,
    remove: (index: number) => void
}

export const TaskItem = ({
    index,
    remove,
    task: {
        id,
        name,
        term,
        completed,
        ownersId
    }
}: TaskItemProps) => {

    const { register } = useFormContext<CreateCardProps>()

    return (
        <Card className="bg-transparent">
            <CardHeader>
                <CardAction>
                    <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => remove(index)}
                    >
                        <X />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4 mb-5">
                <Label
                    htmlFor="name_taks"
                    className="flex flex-col gap-2.5"
                >
                    <span className="self-start">
                        Nome da tarefa:
                    </span>
                    <Input
                        id="name_taks"
                        {...register(`tasks.${index}.name`)}
                    />
                </Label>
                <Label className="flex flex-col gap-3">
                    <span className="self-start">
                        Prazo:
                    </span>
                    <SelectTaskTerm index={index} />
                </Label>
                <Label className="flex flex-col gap-3">
                    <span className="self-start">
                        Responsaveis:
                    </span>
                    <SelectTaskOwners index={index} />
                </Label>
            </CardContent>
        </Card>
    )
}