import * as z from "zod"
import { CompleteCollege, relatedCollegeSchema } from "./index"

export const holidaySchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.date(),
  collegeId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteHoliday extends z.infer<typeof holidaySchema> {
  college: CompleteCollege
}

/**
 * relatedHolidaySchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedHolidaySchema: z.ZodSchema<CompleteHoliday> = z.lazy(() => holidaySchema.extend({
  college: relatedCollegeSchema,
}))
