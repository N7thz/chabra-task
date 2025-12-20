import { RichTextCommentBox } from "@/components/rich-text-comment-box"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

type CommentContainerDialogProps = {
    onOpenCommentsCollapse: (open: boolean) => void
    cardId: string 
}

export const CommentContainerDialog = ({ 
    cardId,
    onOpenCommentsCollapse,
}: CommentContainerDialogProps) => {

    const [open, setOpen] = useState(false)

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger className="w-full">
                <Input placeholder="Digite um comentário..." />
            </AlertDialogTrigger>
            <AlertDialogContent className="min-w-1/3 bg-card">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Adicionar comentário
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
            </AlertDialogContent>
        </AlertDialog>
    )
}
