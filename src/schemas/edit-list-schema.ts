import z from "zod"

export const editListSchema = z.object({
    name: z.string().min(1, "O nome da lista é obrigatório.")
})

export type EditListProps = z.infer<typeof editListSchema>