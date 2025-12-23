import { SelectOwners } from "@/components/forms/form-create-card/select-owners"
import {
    SelectPriority
} from "@/components/forms/form-create-card/select-priority"
import { SelectStatus } from "@/components/forms/form-create-card/select-status"
import { SelectTerm } from "@/components/forms/form-create-card/select-term"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { CardComplete } from "@/types"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock } from "lucide-react"
import { AvatarGroup } from "@/components/avatar-group"
import { Task } from "@prisma/client"
import { Checkbox } from "@/components/ui/checkbox"
import { CardTask } from "./card-task"

export const CardInfoTask = ({ card }: { card: CardComplete }) => {

    const {
        description,
        priority,
        status,
        term,
        ownersId,
        tasks
    } = card

    const tasksCompleteds = tasks.filter(task => task.completed).length

    function getCompletedPercentage(tasks: Task[]) {

        if (tasks.length === 0) return 0

        const completedCount = tasks.filter(t => t.completed).length

        return (completedCount / tasks.length) * 100
    }

    return (
        <ScrollArea className="h-100 p-2">
            <ScrollBar />
            <Card className="size-full border-none bg-transparent">
                <CardContent className="space-y-4">
                    <Label
                        htmlFor="describe"
                        className="flex flex-col gap-2"
                    >
                        Descrição:
                        <Textarea
                            id="describe"
                            defaultValue={description ? description : undefined}
                            className="max-h-20"
                        />
                    </Label>
                    <Label className="flex flex-col gap-2">
                        Status:
                        <SelectStatus
                            defaultValue={status}
                            onValueChange={(value) => console.log(value)}
                        />
                    </Label>
                    <Label className="flex flex-col gap-2">
                        Prioridade:
                        <SelectPriority
                            defaultValue={priority}
                            onValueChange={(value) => console.log(value)}
                        />
                    </Label>
                    <Label className="flex flex-col gap-2">
                        Responsáveis:
                        <SelectOwners
                            selected={ownersId}
                            onSelectionChange={(value) => console.log(value)}
                        />
                    </Label>
                    <Label className="flex flex-col gap-2">
                        Prazo:
                        <SelectTerm
                            date={term}
                            onDateChange={(date) => console.log(date)}
                        />
                    </Label>
                </CardContent>
            </Card>
            <Separator />
            <Card className="mt-4 bg-transparent">
                <CardHeader>
                    <CardTitle className="text-base">
                        Checklist
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="size-3" />
                            {formatDate(term, "dd 'de' MMM", { locale: ptBR })}
                        </div>
                        <AvatarGroup images={["a", "b", "c"]} />
                    </div>
                    <div className="space-y-2.5">
                        <div className="text-sm">
                            {tasksCompleteds} de {tasks.length}
                        </div>
                        <Progress value={getCompletedPercentage(tasks)} />
                    </div>
                    {
                        tasks.length !== 0 &&
                        tasks.map(task => (
                            <CardTask
                                key={task.id}
                                task={task}
                            />
                        ))
                    }
                </CardContent>
            </Card>
        </ScrollArea>
    )
}
