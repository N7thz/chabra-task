import { z } from "zod"

export const createCardSchema = z.object({
    title: z
        .string()
        .min(1, "O titulo é obrigatório."),
    cnpj: z
        .string()
        .min(14, "CNPJ deve ter no minimo 14 caracteres")
        .max(18, "CNPJ deve ter no maximo 18 caracteres")
        .refine((val) => {
            // Remove caracteres não numéricos para validação básica
            const cleanCNPJ = val.replace(/\D/g, "");
            return cleanCNPJ.length === 14;
        }, "CNPJ must be valid (14 numbers)"),
    description: z
        .string()
        .nullable(),
    status: z
        .enum([
            "ACTIVE",
            "INACTIVE",
            "PENDING",
            "SUSPENDED"
        ]),
    term: z
        .date()
        .refine((date) => date > new Date(), {
            message: "O prazo deve estar no futuro."
        }),
    color: z
        .string()
        .nullable()
})

export type CreateCardProps = z.infer<typeof createCardSchema>