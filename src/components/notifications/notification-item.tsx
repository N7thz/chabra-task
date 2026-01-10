import { 
    Card, 
    CardAction, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"
import { Notification } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Ellipsis } from "lucide-react"
import { Button } from "../ui/button"

export const NotificationItem = ({
    notification: {
        message,
        description,
        createdAt,
    }
}: { notification: Notification }) => {
    return (
        <Card className="rounded-sm">
            <CardHeader>
                <CardAction>
                    <Button>
                        <Ellipsis />
                    </Button>
                </CardAction>
                <CardTitle className="text-sm">
                    {message}
                </CardTitle>
                {
                    description &&
                    <CardDescription>
                        {description}
                    </CardDescription>
                }
                <CardDescription className="ml-auto text-xs">
                    {formatDate(createdAt, "PPP", { locale: ptBR })}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
