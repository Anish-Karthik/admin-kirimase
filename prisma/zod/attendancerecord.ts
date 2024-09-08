import * as z from "zod"
import { CompleteEnrollment, relatedEnrollmentSchema, CompleteSchedule, relatedScheduleSchema, CompleteFaculty, relatedFacultySchema, CompleteScheduleHistory, relatedScheduleHistorySchema } from "./index"

export const attendanceRecordSchema = z.object({
  id: z.string(),
  date: z.date(),
  enrollmentId: z.string(),
  scheduleId: z.string(),
  isPresent: z.boolean(),
  facultyId: z.string(),
  scheduleHistoryId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteAttendanceRecord extends z.infer<typeof attendanceRecordSchema> {
  enrollment: CompleteEnrollment
  schedule: CompleteSchedule
  faculty: CompleteFaculty
  scheduleHistory: CompleteScheduleHistory
}

/**
 * relatedAttendanceRecordSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAttendanceRecordSchema: z.ZodSchema<CompleteAttendanceRecord> = z.lazy(() => attendanceRecordSchema.extend({
  enrollment: relatedEnrollmentSchema,
  schedule: relatedScheduleSchema,
  faculty: relatedFacultySchema,
  scheduleHistory: relatedScheduleHistorySchema,
}))
