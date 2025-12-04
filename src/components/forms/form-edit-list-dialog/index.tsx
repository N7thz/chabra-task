import { editList } from "@/actions/lists/edit-list"
import { findListByName } from "@/actions/lists/find-list-by-name"
import { SpanErrorMessage } from "@/components/span-error"
import { queryClient } from "@/components/theme-provider"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export const FormEditListDialog = ({
    id,
    name,
    open,
    onOpenChange
}: {
    id: string
    name: string,
    open: boolean,
    onOpenChange: (open: boolean) => void
}) => {

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["edit-list"],
        mutationFn: ({ oldName, newName }: {
            oldName: string, newName: string
        }) => editList({ oldName, newName }),
        onSuccess: () => {

            toast({
                title: "A lista foi atualizada.",
                onAutoClose: () => onOpenChange(false)
            })

            queryClient.invalidateQueries({
                queryKey: ["find-many-lists"]
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
        data: list
    } = useQuery({
        queryKey: ["find-list-by-name"],
        queryFn: () => findListByName(name)
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<EditListProps>({
        resolver: zodResolver(editListSchema)
    })

    function onSubmit(formData: EditListProps) {
        mutate({
            oldName: name,
            newName: formData.name
        })
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
