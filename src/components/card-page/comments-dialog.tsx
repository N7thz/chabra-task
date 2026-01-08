import { findManyComments } from "@/actions/comments/find-many-comments"
import { RichTextCommentBox } from "@/components/rich-text-comment-box"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { RotateCw, X } from "lucide-react"
import { useState } from "react"
import { toast } from "../toast"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { CommentsItem } from "./comments-item"

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
        error,
        refetch
    } = useQuery({
        queryKey: ["find-many-comments"],
        queryFn: () => findManyComments()
    })

    if (error) {
        return (
            toast({
                title: error.name,
                description: error.message,
                variant: "destructive",
                duration: Infinity,
                closeButton: true,
                action: {
                    label: (
                        <span className="flex items-center gap-2 group">
                            Tentar novamente
                            <RotateCw className="size-3 group-hover:rotate-180 transition-transform" />
                        </span>
                    ),
                    onClick: () => refetch()
                }
            })
        )
    }

    if (isLoading || !comments) return (
        <Input disabled placeholder="Digite um comentário..." />
    )

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
