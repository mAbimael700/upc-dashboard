import { z } from "zod"
import { Aviso } from "./types"

export const avisoFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2).max(50).min(2),
    description: z.string().min(2),
    creationDate: z.string().datetime().default(new Date().toISOString()).transform(v => v.split('.')[0]),
    startDate: z.string().datetime('No es una fecha válida.').transform(v => v.split('.')[0]),
    endDate: z.string().datetime().transform(v => v.split('.')[0]),
    status: z.boolean().default(false),
    fijado: z.boolean().default(false)
})

export const defaultValues = {
    name: '',
    description: '',
    creationDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    status: true,
    fijado: false
} satisfies Aviso