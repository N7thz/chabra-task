"use client"

import { createComments } from "@/actions/comments/create-comment"
import { SpanErrorMessage } from "@/components/span-error"
import {
    AlertDialogAction,
    AlertDialogCancel, AlertDialogFooter
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { colorsComment as colors } from "@/utils/colors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Bold, Italic, Send, Underline } from "lucide-react"
import type React from "react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "./toast"
import { queryClient } from "./theme-provider"
import { queryKeys } from "@/utils/query-keys"

export const commentSchema = z.object({
    content: z
        .string()
        .min(1, "O comentário não pode estar vazio")
        .refine((val) => {
            // Remove HTML tags para verificar se há conteúdo real
            const text = val.replace(/<[^>]*>/g, "").trim()
            return text.length > 0
        }, "O comentário deve conter texto"),
})

export type CommentFormData = z.infer<typeof commentSchema>

export function RichTextCommentBox({
    cardId,
    onOpenCommentsCollapse,
    onOpenChange
}: {
    cardId: string
    onOpenChange: (open: boolean) => void
    onOpenCommentsCollapse: (open: boolean) => void
}) {

    const {
        mutate,
        isPending,
        isSuccess
    } = useMutation({
        mutationKey: ["create-comment"],
        mutationFn: (message: string) => createComments({
            cardId,
            message
        }),
        onSuccess: () => {
            toast({
                title: "Comentário adicionado com sucesso.",
                description: "O comentário foi criado com sucesso.",
                onAutoClose: () => {
                    onOpenChange(false)
                    onOpenCommentsCollapse(true)
                }
            })

            queryClient.invalidateQueries({
                queryKey: queryKeys.card.find(cardId)
            })
        },
        onError: (err) => {
            toast({
                title: err.name,
                description: err.message,
                variant: "destructive"
            })
        }
    })

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
        defaultValues: { content: "" },
    })

    const editorRef = useRef<HTMLDivElement>(null)

    const handleEditorInput = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML
            setValue("content", content, { shouldValidate: true })
        }
    }

    const applyFormat = (command: string) => {
        document.execCommand(command, false, undefined)
        if (editorRef.current) {
            editorRef.current.focus()
            handleEditorInput()
        }
    }

    const applyColor = (color: string) => {
        document.execCommand("foreColor", false, color)
        if (editorRef.current) {
            editorRef.current.focus()
            handleEditorInput()
        }
    }

    const onFormSubmit = ({ content }: CommentFormData) => {

        mutate(content)
        reset()

        if (editorRef.current) {
            editorRef.current.innerHTML = ""
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(onFormSubmit)()
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-4"
        >
            {/* Barra de Ferramentas */}
            <div className="flex flex-col items-center gap-3 rounded-lg p-3 border border-border">
                <div className="w-full flex gap-2 justify-start">
                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => applyFormat("bold")}
                        className="w-10 h-10 p-0"
                        title="Negrito"
                    >
                        <Bold className="size-4" />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => applyFormat("italic")}
                        className="w-10 h-10 p-0"
                        title="Itálico"
                    >
                        <Italic className="size-4" />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => applyFormat("underline")}
                        className="w-10 h-10 p-0"
                        title="Sublinhado"
                    >
                        <Underline className="size-4" />
                    </Button>
                </div>

                <Separator />

                <div className="w-full flex gap-1">
                    {colors.map((color) => (
                        <Button
                            key={color}
                            type="button"
                            onClick={() => applyColor(color)}
                            className="size-8 rounded hover:scale-90 transition-transform border"
                            style={{ backgroundColor: color }}
                            title={`Cor: ${color}`}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <div
                    data-placeholder="Escreva um comentário..."
                    ref={editorRef}
                    contentEditable
                    onInput={handleEditorInput}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "bg-popover min-h-40 max-h-60 px-4 py-3 border-2 border-border rounded-lg text-foreground overflow-y-auto",
                        "focus:outline-none focus:ring-2 focus:ring-primary",
                    )}
                    style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                />
                {/* Campo hidden para react-hook-form */}
                <input
                    type="hidden"
                    {...register("content")}
                />
                {errors.content &&
                    <SpanErrorMessage message={errors.content.message} />
                }
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                    type="submit"
                    disabled={isPending || isSuccess}
                    variant="default"
                    className="gap-2"
                >
                    <Send className="size-4" />
                    {
                        isPending ? "Enviando..." : "Enviar Comentário"
                    }
                </AlertDialogAction>
            </AlertDialogFooter>

            <style jsx>
                {`[contenteditable][data-placeholder]:empty:before 
            {
                content: attr(data-placeholder);
                color: hsl(var(--muted-foreground));
                pointer-events: none;
            }`}
            </style>
        </form>
    )
}