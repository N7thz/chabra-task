import { z } from "zod"

export const createTaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "O nome da tarefa é obrigatório."),
    term: z.date(),
    completed: z.boolean(),
    ownersId: z.array(z.string())
})

export type CreateTaskProps = z.infer<typeof createTaskSchema>

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
    priority: z
        .enum([
            "URGENT",
            "HIGH",
            "MID",
            "LOW",
        ]),
    status: z
        .enum([
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED"
        ]),
    term: z
        .date(),
    color: z
        .string()
        .nullable(),
    ownersId: z
        .array(z.string()),
    tasks: z
        .array(createTaskSchema)
})

export type CreateCardProps = z.infer<typeof createCardSchema>