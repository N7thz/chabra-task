import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent
} from "./ui/card"
import { Button } from "./ui/button"
import { Clock, Ellipsis } from "lucide-react"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Progress } from "./ui/progress"
import { AvatarGroup } from "./avatar-group"
import { Card as CardContainerProps } from "@/types"
import { Task } from "@prisma/client"
import { useRouter } from "next/navigation"

export const CardContainer = ({
    space,
    card: {
        id,
        title,
        description,
        term,
        tasks
    }
}: {
    card: CardContainerProps,
    space: string
}) => {

    const { push } = useRouter()

    const tasksCompleteds = tasks.filter(task => task.completed).length

    function getCompletedPercentage(tasks: Task[]) {

        if (tasks.length === 0) return 0;

        const completedCount = tasks.filter(t => t.completed).length;

        return (completedCount / tasks.length) * 100;
    };

    return (
        <Card
            className="hover:scale-95 duration-200 cursor-pointer"
            onClick={() => push(`/${space}/card/${id}`)}
        >
            <CardHeader>
                <CardAction>
                    <Button variant={"ghost"}>
                        <Ellipsis />
                    </Button>
                </CardAction>
                <CardTitle className="text-base">
                    {title}
                </CardTitle>
                {
                    description &&
                    <CardDescription>
                        {description}
                    </CardDescription>
                }
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-3" />
                        {formatDate(term, "dd 'de' MMM", { locale: ptBR })}
                    </div>
                    <AvatarGroup />
                </div>
                <div className="space-y-2.5">
                    <div className="text-sm">
                        {tasksCompleteds} de {tasks.length}
                    </div>
                    <Progress value={getCompletedPercentage(tasks)} />
                </div>
            </CardContent>
        </Card>
    )
}
