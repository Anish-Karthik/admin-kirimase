import * as z from "zod"
import { CompleteDepartment, relatedDepartmentSchema, CompleteCourseEnrolledStudent, relatedCourseEnrolledStudentSchema, CompletePeriod, relatedPeriodSchema } from "./index"

export const courseSchema = z.object({
  id: z.string(),
  name: z.string(),
  departmentId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteCourse extends z.infer<typeof courseSchema> {
  department: CompleteDepartment
  courseEnrolledStudent: CompleteCourseEnrolledStudent[]
  period: CompletePeriod[]
}

/**
 * relatedCourseSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCourseSchema: z.ZodSchema<CompleteCourse> = z.lazy(() => courseSchema.extend({
  department: relatedDepartmentSchema,
  courseEnrolledStudent: relatedCourseEnrolledStudentSchema.array(),
  period: relatedPeriodSchema.array(),
}))
