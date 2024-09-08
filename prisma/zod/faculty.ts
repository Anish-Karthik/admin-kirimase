import * as z from "zod"
import { CompleteDepartment, relatedDepartmentSchema, CompleteFacultySubject, relatedFacultySubjectSchema, CompleteAttendanceRecord, relatedAttendanceRecordSchema } from "./index"

export const facultySchema = z.object({
  id: z.string(),
  name: z.string(),
  departmentId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteFaculty extends z.infer<typeof facultySchema> {
  department: CompleteDepartment
  FacultySubject: CompleteFacultySubject[]
  AttendanceRecord: CompleteAttendanceRecord[]
}

/**
 * relatedFacultySchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFacultySchema: z.ZodSchema<CompleteFaculty> = z.lazy(() => facultySchema.extend({
  department: relatedDepartmentSchema,
  FacultySubject: relatedFacultySubjectSchema.array(),
  AttendanceRecord: relatedAttendanceRecordSchema.array(),
}))
