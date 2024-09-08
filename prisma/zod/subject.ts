import * as z from "zod"

export const subjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  electiveName: z.string().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
