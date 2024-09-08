import * as z from "zod"
import { CompleteHoliday, relatedHolidaySchema, CompleteDepartment, relatedDepartmentSchema } from "./index"

export const collegeSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteCollege extends z.infer<typeof collegeSchema> {
  holiday: CompleteHoliday[]
  department: CompleteDepartment[]
}

/**
 * relatedCollegeSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCollegeSchema: z.ZodSchema<CompleteCollege> = z.lazy(() => collegeSchema.extend({
  holiday: relatedHolidaySchema.array(),
  department: relatedDepartmentSchema.array(),
}))
