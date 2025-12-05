import z from "zod";

export const createSpaceSchema = z.object({
    name: z
        .string()
        .min(1, "O nome da região é obrigatório")
        .toLowerCase(),
})

export type FormCreateSpaceProps = z.infer<typeof createSpaceSchema>;