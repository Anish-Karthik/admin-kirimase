import * as z from "zod"
import { CompleteCourse, relatedCourseSchema } from "./index"

export const periodSchema = z.object({
  id: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  version: z.number().int(),
  isActive: z.boolean(),
  courseId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePeriod extends z.infer<typeof periodSchema> {
  course: CompleteCourse
}

/**
 * relatedPeriodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPeriodSchema: z.ZodSchema<CompletePeriod> = z.lazy(() => periodSchema.extend({
  course: relatedCourseSchema,
}))
