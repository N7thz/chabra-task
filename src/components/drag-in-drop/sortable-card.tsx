"use client"

import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ComponentProps } from "react"

type Props = ComponentProps<"div"> & {
    id: string
}

export function SortableCard({ id, children, className, ...props }: Props) {

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            {...props}
            className={cn("cursor-grab active:cursor-grabbing", className)}
        >
            {children}
        </div>
    )
}
