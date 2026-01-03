import { deleteList } from "@/actions/lists/delete-list"
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
import { Spinner } from "@/components/ui/spinner"
import { List } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"

export const FormDeleteListDialog = ({
    id,
    open,
    onOpenChange
}: {
    id: string
    open: boolean,
    onOpenChange: (open: boolean) => void
}) => {

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["edit-list"],
        mutationFn: (id: string) => deleteList(id),
        onSuccess: (list) => {

            toast({
                title: "A lista foi excluida.",
                onAutoClose: () => onOpenChange(false)
            })

            queryClient.setQueryData<List[]>(["find-many-lists"], (oldData) => {

                if (!oldData) return []

                const newLists =
                    oldData.filter(oldList => oldList.id !== list.id)

                return newLists
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

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>
                        Excluir Lista?
                    </DialogTitle>
                    <DialogDescription className="text-destructive text-lg">
                        Tem certeza que deseja excluir essa lista? Os cartões também serão excluidos
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isPending || isSuccess}
                        onClick={() => mutate(id)}
                    >
                        {
                            (isPending || isSuccess)
                                ? <Spinner />
                                : "Confirmar"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
