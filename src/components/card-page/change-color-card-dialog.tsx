import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
    Image
} from "lucide-react"
import {
    FormChangeColorCardDialog
} from "../forms/form-change-color-card-dialog"
import { useState } from "react"

type ChangeColorCardDialogProps = {
    id: string
    color: string | null
}

export const ChangeColorCardDialog = ({
    id, color
}: ChangeColorCardDialogProps) => {

    const [open, setOpen] = useState(false)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger>
                <div
                    style={{
                        background: color ?? undefined
                    }}
                    className="flex items-center justify-center h-50 w-full border-b group"
                >
                    <div className={cn(
                        "invisible flex flex-col gap-2 items-center",
                        "transition-opacity",
                        "group-hover:visible"
                    )}>
                        <div className={cn("size-16 border-2 rounded-full p-2 flex items-center justify-center")}>
                            <Image />
                        </div>
                        <span>
                            {
                                color ? "Alterar capa" : "Adicionar capa"
                            }
                        </span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-fit">
                <DialogHeader>
                    <DialogTitle>
                        Alterar capa
                    </DialogTitle>
                    <DialogDescription>
                        Altere a capa do cartão
                    </DialogDescription>
                </DialogHeader>
                <FormChangeColorCardDialog
                    id={id}
                    onOpenChange={setOpen}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="destructive"
                            className="w-1/2"
                        >
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        form="form-change-card-color"
                        className="w-1/2"
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
