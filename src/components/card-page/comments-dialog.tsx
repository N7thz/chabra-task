import { RichTextCommentBox } from "@/components/rich-text-comment-box"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/utils/query-keys"
import { findManyComments } from "@/actions/comments/find-many-comments"
import { CommentsItem } from "./comments-item"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { X } from "lucide-react"

type CommentContainerDialogProps = {
    onOpenCommentsCollapse: (open: boolean) => void
    cardId: string
}

export const CommentContainerDialog = ({
    cardId,
    onOpenCommentsCollapse,
}: CommentContainerDialogProps) => {

    const [open, setOpen] = useState(false)

    const {
        data: comments,
        isLoading,
        error
    } = useQuery({
        queryKey: queryKeys.comment.findMany(),
        queryFn: () => findManyComments()
    })

    if (isLoading || !comments) return <span>
        Carregando...
    </span>

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger className="w-full">
                <Input placeholder="Digite um comentário..." />
            </AlertDialogTrigger>
            <AlertDialogContent className="min-w-1/2 max-h-5/6 bg-card">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-between">
                        Adicionar comentário
                        <AlertDialogCancel variant={"ghost"}>
                            <X />
                        </AlertDialogCancel>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Adicione um comentário neste cartão
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <RichTextCommentBox
                    cardId={cardId}
                    onOpenCommentsCollapse={onOpenCommentsCollapse}
                    onOpenChange={setOpen}
                />
                <Separator className="my-5" />
                <ScrollArea className="h-60">
                    <ScrollBar />
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Comentários ({comments.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {
                                comments.length === 0
                                    ? (
                                        <div className="rounded-md border py-2 px-2.5 text-sm flex flex-col gap-5">
                                            <span className="truncate text-center text-muted-foreground italic">
                                                sem comentários ainda...
                                            </span>
                                        </div>
                                    )
                                    : comments.map(comment => (
                                        <CommentsItem
                                            key={comment.id}
                                            comment={comment}
                                        />
                                    ))
                            }
                        </CardContent>
                    </Card>
                </ScrollArea>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        variant={"destructive"}
                        className="w-1/3"
                    >
                        <X />
                        Cancelar
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
