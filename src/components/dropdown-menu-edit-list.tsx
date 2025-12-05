"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
import {
    FormChangeColorListDialog
} from "./forms/form-change-color-list-dialog"
import { FormDeleteListDialog } from "./forms/form-delete-list-dialog"
import { FormEditListDialog } from "./forms/form-edit-list-dialog"

type DropdownMenuEditDialogProps = {
    id: string,
    name: string
}

export const DropdownMenuEditDialog = ({
    id, name
}: DropdownMenuEditDialogProps) => {

    const [showEditDialog, setShowEditDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showChangeColorDialog, setShowChangeColorDialog] = useState(false)

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        aria-label="Open menu"
                        size="icon"
                    >
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuLabel className="text-muted-foreground">
                        Opções
                    </DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onSelect={() => setShowEditDialog(true)}
                        >
                            Editar Lista
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => setShowDeleteDialog(true)}
                        >
                            Excluir Lista
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => setShowChangeColorDialog(true)}
                        >
                            Alterar cor do cartão
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <FormEditListDialog
                id={id}
                name={name}
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
            />
            <FormDeleteListDialog
                id={id}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            />
            <FormChangeColorListDialog
                id={id}
                open={showChangeColorDialog}
                onOpenChange={setShowChangeColorDialog}
            />
        </>
    )
}