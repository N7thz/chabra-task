import { z } from "zod"

export const createListSchema = z.object({
    name: z.string().min(1, "O nome da lista é obrigatório"),
})

export type FormCreateListProps = z.infer<typeof createListSchema>