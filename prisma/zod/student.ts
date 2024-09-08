import * as z from "zod"
import { CompleteCourseEnrolledStudent, relatedCourseEnrolledStudentSchema } from "./index"

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  regNumber: z.string(),
  email: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteStudent extends z.infer<typeof studentSchema> {
  CourseEnrolledStudent: CompleteCourseEnrolledStudent[]
}

/**
 * relatedStudentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedStudentSchema: z.ZodSchema<CompleteStudent> = z.lazy(() => studentSchema.extend({
  CourseEnrolledStudent: relatedCourseEnrolledStudentSchema.array(),
}))
