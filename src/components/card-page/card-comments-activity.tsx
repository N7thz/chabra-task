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
import { useEffect, useState } from "react"
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

    const [commentsContainerOpen, setCommentsContainerOpen] = useState(false)
    const [activitiesContainer, setActivitiesContainer] = useState(false)

    function toggleExclusive(
        target: "comments" | "activities"
    ) {
        if (target === "comments") {
            setCommentsContainerOpen(true)
            setActivitiesContainer(false)
        }

        if (target === "activities") {
            setActivitiesContainer(true)
            setCommentsContainerOpen(false)
        }
    }


    return (
        <Card className="size-full border-none">
            <CardHeader>
                <CardTitle className="flex items-center text-base gap-2 whitespace-nowrap">
                    <MessageSquareText className="size-5" />
                    Comentários e atividade
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-3 flex flex-col gap-2">
                <ActivitiesContainer
                    open={activitiesContainer}
                    setOpen={setActivitiesContainer}
                    activities={activities}
                    toggleExclusive={toggleExclusive}
                />
                <CommentsContainer
                    open={commentsContainerOpen}
                    onOpenChange={setCommentsContainerOpen}
                    comments={comments}
                    toggleExclusive={toggleExclusive}
                />
            </CardContent>
            <CardFooter className="px-3">
                <CommentContainerDialog
                    cardId={id}
                    onOpenCommentsCollapse={setCommentsContainerOpen}
                />
            </CardFooter>
        </Card>
    )
}
