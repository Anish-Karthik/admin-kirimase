import * as z from "zod"
import { UserRole } from "@prisma/client"
import { CompleteSession, relatedSessionSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string().nullish(),
  phone: z.string().nullish(),
  role: z.nativeEnum(UserRole),
  verified: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  Session: CompleteSession[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  Session: relatedSessionSchema.array(),
}))
