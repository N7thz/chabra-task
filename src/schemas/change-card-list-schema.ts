import z from "zod"

export const changeCardListSchema = z.object({
    currentListId: z.uuid(),
    newListId: z.uuid(),
})

export type ChangeCardListProps = z.infer<typeof changeCardListSchema>