import z from "zod";

export const createRegionSchema = z.object({
    name: z
        .string()
        .min(1, "O nome da região é obrigatório")
        .toLowerCase(),
})

export type FormCreateRegionProps = z.infer<typeof createRegionSchema>;