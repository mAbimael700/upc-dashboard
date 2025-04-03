import { z } from "zod"

export const avisoFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2).max(50).min(2),
    description: z.string().min(2),
    creationDate: z.date().default(new Date()),
    startDate: z.date(),
    endDate: z.date(),
    status: z.boolean().default(false),
    fijado: z.boolean().default(false)
})

export const defaultValues = {
    name: '',
    description: '',
    creationDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    status: true,
    fijado: false
}