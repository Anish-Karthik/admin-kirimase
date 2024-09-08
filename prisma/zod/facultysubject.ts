import * as z from "zod"
import { CompleteSubject, relatedSubjectSchema, CompleteFaculty, relatedFacultySchema, CompleteSchedule, relatedScheduleSchema } from "./index"

export const facultySubjectSchema = z.object({
  id: z.string(),
  subjectId: z.string(),
  facultyId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteFacultySubject extends z.infer<typeof facultySubjectSchema> {
  subject: CompleteSubject
  faculty: CompleteFaculty
  Schedule: CompleteSchedule[]
}

/**
 * relatedFacultySubjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFacultySubjectSchema: z.ZodSchema<CompleteFacultySubject> = z.lazy(() => facultySubjectSchema.extend({
  subject: relatedSubjectSchema,
  faculty: relatedFacultySchema,
  Schedule: relatedScheduleSchema.array(),
}))
