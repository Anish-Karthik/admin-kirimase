import * as z from "zod"

export const collegeSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
