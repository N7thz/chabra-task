import { AvatarGroup } from "@/components/avatar-group"
import { CardTask } from "@/components/card-page/card-task"
import { SelectOwners } from "@/components/forms/form-create-card/select-owners"
import {
    SelectPriority
} from "@/components/forms/form-create-card/select-priority"
import { SelectStatus } from "@/components/forms/form-create-card/select-status"
import { SelectTerm } from "@/components/forms/form-create-card/select-term"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { CreateCardProps } from "@/schemas/create-card-schema"
import { CardComplete } from "@/types"
import { Priority, Status, Task } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"

export const CardInfoTask = ({
    card: {
        description,
        priority,
        status,
        ownersId,
        tasks
    }
}: { card: CardComplete }) => {

    const {
        control,
        setValue,
        register,
        watch,
    } = useFormContext<CreateCardProps>()

    const term = watch("term")

    const tasksCompleteds = tasks.filter(task => task.completed).length

    function getCompletedPercentage(tasks: Task[]) {

        if (tasks.length === 0) return 0

        const completedCount = tasks.filter(t => t.completed).length

        return (completedCount / tasks.length) * 100
    }

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        name: "tasks",
        control,
    })

    console.log(fields)

    function appendTasks() {
        append({
            id: "",
            name: "",
            term: new Date(),
            completed: false,
            ownersId: []
        })
    }

    return (
        <ScrollArea className="h-100 p-2">
            <ScrollBar />
            <Card className="size-full border-none bg-transparent" >
                <CardContent className="space-y-4" >
                    <Label className="flex flex-col gap-2" >
                        Status:
                        <SelectStatus
                            defaultValue={status}
                            onValueChange={(value) => setValue("status", value as Status)}
                        />
                    </Label>
                    <Label className="flex flex-col gap-2" >
                        Prioridade:
                        <SelectPriority
                            defaultValue={priority}
                            onValueChange={(value) => setValue("priority", value as Priority)}
                        />
                    </Label>
                    <Label className="flex flex-col gap-2" >
                        Prazo:
                        <SelectTerm
                            date={term}
                            onDateChange={(date) => setValue("term", date)}
                        />
                    </Label>
                    <Label className="flex flex-col gap-2" >
                        Responsáveis:
                        <SelectOwners
                            selected={ownersId}
                            onSelectionChange={(value) => setValue("ownersId", value)}
                        />
                    </Label>
                    <Label
                        htmlFor="describe"
                        className="flex flex-col gap-2"
                    >
                        Descrição:
                        <Textarea
                            id="describe"
                            defaultValue={description ? description : undefined}
                            className="max-h-20"
                            {...register("description")}
                        />
                    </Label>
                </CardContent>
            </Card>
            <Separator />
            <Card className="mt-4 bg-transparent" >
                <CardHeader>
                    <CardTitle className="text-base" >
                        Checklist
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2" >
                    <div className="flex justify-between" >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground" >
                            <Clock className="size-3" />
                            {formatDate(term, "dd 'de' MMM", { locale: ptBR })}
                        </div>
                        <AvatarGroup images={["a", "b", "c"]} />
                    </div>
                    <div className="space-y-2.5" >
                        <div className="text-sm" >
                            {tasksCompleteds} de {tasks.length}
                        </div>
                        <Progress value={getCompletedPercentage(tasks)} />
                    </div>
                    {
                        fields.length !== 0 &&
                        fields.map(({ id, ...rest }, index) => (
                            <CardTask
                                key={id}
                                task={{ id, ...rest }}
                                index={index}
                                remove={remove}
                            />
                        ))
                    }
                </CardContent>
                <CardFooter className="justify-end" >
                    <Button
                        type="button"
                        variant={"outline"}
                        onClick={appendTasks}
                        className="w-1/2"
                    >
                        Adicionar tarefa
                    </Button>
                </CardFooter>
            </Card>
        </ScrollArea>
    )
}
