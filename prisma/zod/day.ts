import * as z from "zod"
import { CompleteSchedule, relatedScheduleSchema } from "./index"

export const daySchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteDay extends z.infer<typeof daySchema> {
  schedule: CompleteSchedule[]
}

/**
 * relatedDaySchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedDaySchema: z.ZodSchema<CompleteDay> = z.lazy(() => daySchema.extend({
  schedule: relatedScheduleSchema.array(),
}))
