"use client"

import type React from "react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, Palette, Send } from "lucide-react"
import { SpanErrorMessage } from "./span-error"
import { Card, CardContent, CardFooter } from "./ui/card"

export const commentSchema = z.object({
    content: z
        .string()
        .min(1, "O comentário não pode estar vazio")
        .refine((val) => {
            const text = val.replace(/<[^>]*>/g, "").trim()
            return text.length > 0
        }, "O comentário deve conter texto"),
})

export type CommentFormData = z.infer<typeof commentSchema>

export const RichTextCommentBox = () => {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
    })

    const editorRef = useRef<HTMLDivElement>(null)
    const colorInputRef = useRef<HTMLInputElement>(null)

    const colors = [
        "#ffffff",
        "#000000",
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#06b6d4",
        "#3b82f6",
        "#8b5cf6"
    ]

    const applyFormat = (formatType: "bold" | "italic" | "underline") => {
        document.execCommand(formatType)
        editorRef.current?.focus()
    }

    const applyColor = (color: string) => {
        document.execCommand("foreColor", false, color)
        editorRef.current?.focus()
    }

    const onFormSubmit = (data: CommentFormData) => {

        console.log(data)

        if (editorRef.current) {
            editorRef.current.innerHTML = ""
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && e.ctrlKey) {
            handleSubmit(onFormSubmit)()
        }
    }

    return (
        <Card>
            <CardContent>
                <form
                    id="form-add-comments"
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="space-y-4"
                >
                    <div className="rounded-lg p-3 border border-border">
                        <div className="flex flex-wrap gap-2 items-center">
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => applyFormat("bold")}
                                className="w-10 h-10 p-0"
                                title="Negrito (Ctrl+B)"
                            >
                                <Bold className="w-4 h-4" />
                            </Button>

                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => applyFormat("italic")}
                                className="w-10 h-10 p-0"
                                title="Itálico (Ctrl+I)"
                            >
                                <Italic className="w-4 h-4" />
                            </Button>

                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => applyFormat("underline")}
                                className="w-10 h-10 p-0"
                                title="Sublinhado (Ctrl+U)"
                            >
                                <Underline className="w-4 h-4" />
                            </Button>

                            <div className="w-px h-6 bg-border" />

                            <div className="flex items-center gap-2">

                                <input
                                    ref={colorInputRef}
                                    type="color"
                                    onChange={(e) => applyColor(e.target.value)}
                                    className="hidden"
                                />

                                <div className="flex gap-1">
                                    {colors.map((color) => (
                                        <Button
                                            key={color}
                                            type="button"
                                            size={"icon"}
                                            onClick={() => applyColor(color)}
                                            className="rounded-lg border-2 hover:scale-110 transition-transform"
                                            style={{ backgroundColor: color }}
                                            title={`Cor: ${color}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <input type="hidden" {...register("content")} />
                        <div
                            ref={editorRef}
                            contentEditable
                            onInput={(e) => {
                                const html = e.currentTarget.innerHTML
                                setValue("content", html, { shouldValidate: true })
                            }}
                            onKeyDown={handleKeyDown}
                            className="w-full min-h-40 p-4 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                            style={{ wordBreak: "break-word" }}
                            suppressContentEditableWarning
                        />
                        {
                            errors.content &&
                            <SpanErrorMessage
                                message={errors.content.message}
                            />
                        }
                    </div>
                </form>
            </CardContent>
            <CardFooter className="justify-end">
                <Button
                    form="form-add-comments"
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2"
                >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Enviando..." : "Enviar Comentário"}
                </Button>
            </CardFooter>
        </Card>
    )
}
