import * as z from "zod"
import { CompleteCourse, relatedCourseSchema, CompleteStudent, relatedStudentSchema, CompleteElectiveSubject, relatedElectiveSubjectSchema } from "./index"

export const courseEnrolledStudentSchema = z.object({
  id: z.string(),
  batchYear: z.number().int(),
  courseId: z.string(),
  studentId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteCourseEnrolledStudent extends z.infer<typeof courseEnrolledStudentSchema> {
  course: CompleteCourse
  student: CompleteStudent
  electiveSubject: CompleteElectiveSubject[]
}

/**
 * relatedCourseEnrolledStudentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCourseEnrolledStudentSchema: z.ZodSchema<CompleteCourseEnrolledStudent> = z.lazy(() => courseEnrolledStudentSchema.extend({
  course: relatedCourseSchema,
  student: relatedStudentSchema,
  electiveSubject: relatedElectiveSubjectSchema.array(),
}))
