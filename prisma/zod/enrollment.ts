import * as z from "zod"
import { CompleteCourseEnrolledStudent, relatedCourseEnrolledStudentSchema, CompleteSection, relatedSectionSchema } from "./index"

export const enrollmentSchema = z.object({
  id: z.string(),
  rollNumber: z.number().int(),
  courseEnrolledStudentId: z.string(),
  sectionId: z.string(),
  joinedAt: z.date(),
  leftAt: z.date().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteEnrollment extends z.infer<typeof enrollmentSchema> {
  courseEnrolledStudent: CompleteCourseEnrolledStudent
  section: CompleteSection
}

/**
 * relatedEnrollmentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedEnrollmentSchema: z.ZodSchema<CompleteEnrollment> = z.lazy(() => enrollmentSchema.extend({
  courseEnrolledStudent: relatedCourseEnrolledStudentSchema,
  section: relatedSectionSchema,
}))
