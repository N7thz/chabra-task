import { Card as CardProps } from "@prisma/client"
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

export const CardContainer = ({ card: {
    id,
    title,
    description,
    term,

} }: { card: CardProps }) => {
    return (
        <Card>
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
                <div>
                    <Progress value={Math.floor(Math.random() * 100) + 1}/>
                </div>
            </CardContent>
        </Card>
    )
}
