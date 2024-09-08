import * as z from "zod"
import { CompleteCourseEnrolledStudent, relatedCourseEnrolledStudentSchema, CompleteSubject, relatedSubjectSchema, CompleteSection, relatedSectionSchema } from "./index"

export const electiveSubjectSchema = z.object({
  id: z.string(),
  courseEnrolledStudentId: z.string(),
  subjectId: z.string(),
  sectionId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteElectiveSubject extends z.infer<typeof electiveSubjectSchema> {
  courseEnrolledStudent: CompleteCourseEnrolledStudent
  subject: CompleteSubject
  section: CompleteSection
}

/**
 * relatedElectiveSubjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedElectiveSubjectSchema: z.ZodSchema<CompleteElectiveSubject> = z.lazy(() => electiveSubjectSchema.extend({
  courseEnrolledStudent: relatedCourseEnrolledStudentSchema,
  subject: relatedSubjectSchema,
  section: relatedSectionSchema,
}))
