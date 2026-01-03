import { editList } from "@/actions/lists/edit-list"
import { findListById } from "@/actions/lists/find-list-by-id"
import { SpanErrorMessage } from "@/components/span-error"
import { queryClient } from "@/providers/theme-provider"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { EditListProps, editListSchema } from "@/schemas/edit-list-schema"
import { queryKeys } from "@/utils/query-keys"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { RotateCw } from "lucide-react"
import { useForm } from "react-hook-form"

export const FormEditListDialog = ({
    id,
    space,
    open,
    onOpenChange
}: {
    id: string
    space: string
    open: boolean,
    onOpenChange: (open: boolean) => void
}) => {

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["edit-list"],
        mutationFn: ({ id, name }: {
            id: string, name: string
        }) => editList({ id, name }),
        onSuccess: () => {

            toast({
                title: "A lista foi atualizada.",
                onAutoClose: () => onOpenChange(false)
            })

            queryClient.invalidateQueries({
                queryKey: queryKeys.list.findMany(space)
            })
        },
        onError: (error) => {
            toast({
                title: error.name,
                description: error.message,
                variant: "destructive"
            })
        }
    })

    const {
        data: list,
        error,
        refetch
    } = useQuery({
        queryKey: queryKeys.list.find(id),
        queryFn: () => findListById(id)
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<EditListProps>({
        resolver: zodResolver(editListSchema)
    })

    function onSubmit({ name }: EditListProps) {
        mutate({ id, name })
    }

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

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Editar Lista
                    </DialogTitle>
                    <DialogDescription>
                        Edite o nome da lista
                    </DialogDescription>
                </DialogHeader>
                <form
                    id="form-edit-list"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FieldGroup className="pb-3">
                        <Field>
                            <FieldLabel htmlFor="filename">
                                Nome da lista:
                            </FieldLabel>
                            <Input
                                {...register("name")}
                                className={cn(
                                    errors.name && [
                                        "focus-visible:ring-destructive",
                                        "not-focus-visible:border-destructive",
                                    ]
                                )}
                                defaultValue={list?.name}
                            />
                            {
                                errors.name &&
                                <SpanErrorMessage message={errors.name.message} />
                            }
                        </Field>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"destructive"}>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        form="form-edit-list"
                        disabled={isPending || isSuccess}
                        type="submit"
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
