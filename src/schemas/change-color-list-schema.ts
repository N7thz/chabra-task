import z from "zod"

export const changeColorListSchema = z.object({
    color: z.string()
})

export type ChangeColorListProps = z.infer<typeof changeColorListSchema>