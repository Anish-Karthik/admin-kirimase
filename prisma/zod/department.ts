import * as z from "zod"
import { CompleteCollege, relatedCollegeSchema, CompleteCourse, relatedCourseSchema } from "./index"

export const departmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  collegeId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteDepartment extends z.infer<typeof departmentSchema> {
  college: CompleteCollege
  course: CompleteCourse[]
}

/**
 * relatedDepartmentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedDepartmentSchema: z.ZodSchema<CompleteDepartment> = z.lazy(() => departmentSchema.extend({
  college: relatedCollegeSchema,
  course: relatedCourseSchema.array(),
}))
