import * as z from "zod"
import { CompleteCourse, relatedCourseSchema, CompleteElectiveSubject, relatedElectiveSubjectSchema, CompleteEnrollment, relatedEnrollmentSchema, CompleteSchedule, relatedScheduleSchema } from "./index"

export const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  batchYear: z.number().int(),
  semester: z.number().int(),
  courseId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSection extends z.infer<typeof sectionSchema> {
  course: CompleteCourse
  ElectiveSubject: CompleteElectiveSubject[]
  Enrollment: CompleteEnrollment[]
  Schedule: CompleteSchedule[]
}

/**
 * relatedSectionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSectionSchema: z.ZodSchema<CompleteSection> = z.lazy(() => sectionSchema.extend({
  course: relatedCourseSchema,
  ElectiveSubject: relatedElectiveSubjectSchema.array(),
  Enrollment: relatedEnrollmentSchema.array(),
  Schedule: relatedScheduleSchema.array(),
}))
