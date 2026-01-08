"use client"

import { changeListCard } from "@/actions/cards/change-list-card"
import { findListById } from "@/actions/lists/find-list-by-id"
import { SpanErrorMessage } from "@/components/span-error"
import { toast } from "@/components/toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { queryClient } from "@/providers/theme-provider"
import {
    ChangeCardListProps,
    changeCardListSchema
} from "@/schemas/change-card-list-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { SelectList } from "./select-list"
import { Card as CardProps } from "@prisma/client"

type FormChangeCardListProps = {
    cardId: string
    listId: string
    space: string
}

export const FormChangeCardList = ({
    listId, cardId, space
}: FormChangeCardListProps) => {

    const [open, setOpen] = useState(false)

    const {
        data: list
    } = useQuery({
        queryKey: ["find-list-by-id", listId],
        queryFn: () => findListById(listId)
    })

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["change-card-list"],
        mutationFn: ({
            cardId,
            currentListId,
            newListId
        }: {
            currentListId: string
            newListId: string
            cardId: string
        }) => changeListCard({ cardId, currentListId, newListId }),
        onSuccess: ({ card, oldListId, newListId }) => {

            toast({
                title: `O cartão foi movido para a lista ${card.list?.name}`,
                onAutoClose: () => setOpen(false)
            })

            throw new Error("inplementar atualização via invalidate")
        },
        onError: (err) => {
            toast({
                title: err.name,
                description: err.message,
                variant: "destructive"
            })
        }
    })

    const form = useForm<ChangeCardListProps>({
        resolver: zodResolver(changeCardListSchema),
        defaultValues: {
            currentListId: listId
        }
    })

    const {
        watch,
        handleSubmit,
    } = form

    function onSubmit({ currentListId, newListId }: ChangeCardListProps) {

        console.log(currentListId, newListId)

        if (currentListId === newListId) return

        mutate({ cardId, currentListId, newListId })
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                >
                    Alterar lista do cartão
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <FormProvider {...form}>
                <form>
                    <AlertDialogContent className="sm:min-w-120 space-y-5">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Alterar lista do cartão
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Altere a lista do cartão atual
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-2">
                            <Label className="flex flex-col gap-2">
                                Lista atual:
                                <Input
                                    readOnly
                                    value={list?.name}
                                />
                            </Label>
                            <SelectList space={space} />
                            {
                                watch("currentListId") === watch("newListId") &&
                                <SpanErrorMessage message="A nova lista deve ser diferente da atual." />
                            }
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                type="button"
                                variant="destructive"
                                className="w-1/2"
                            >
                                Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                                type="submit"
                                variant="default"
                                className="w-1/2"
                                disabled={watch("currentListId") === watch("newListId")}
                                onClick={(e) => {
                                    e.preventDefault()

                                    handleSubmit(onSubmit)()
                                }}
                            >
                                {
                                    (isPending || isSuccess)
                                        ? <Spinner />
                                        : "Confirmar"
                                }
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </form>
            </FormProvider>
        </AlertDialog>
    )
}