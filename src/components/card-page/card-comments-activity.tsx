import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { MessageSquareText } from "lucide-react"
import { ActivitiesContainer } from "./activities"
import { CommentsContainer } from "./comments-container"
import { CommentContainerDialog } from "./comments-dialog"
import { useState } from "react"
import { Activity, Comments } from "@prisma/client"

type CardCommentsActivityProps = {
    id: string
    comments: Comments[]
    activities: Activity[]
}

export const CardCommentsActivity = ({
    id,
    comments,
    activities
}: CardCommentsActivityProps) => {

    const [open, setOpen] = useState(false)

    return (
        <Card className="size-full border-none">
            <CardHeader>
                <CardTitle className="flex items-center text-base gap-2 whitespace-nowrap">
                    <MessageSquareText className="size-5" />
                    Comentários e atividade
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-3 flex flex-col gap-2">
                <ActivitiesContainer activities={activities} />
                <CommentsContainer
                    open={open}
                    onOpenChange={setOpen}
                    comments={comments}
                />
            </CardContent>
            <CardFooter className="px-3">
                <CommentContainerDialog
                    cardId={id}
                    onOpenCommentsCollapse={setOpen}
                />
            </CardFooter>
        </Card>
    )
}
