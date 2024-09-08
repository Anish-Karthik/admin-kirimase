import * as z from "zod"

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  regNumber: z.string(),
  email: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
