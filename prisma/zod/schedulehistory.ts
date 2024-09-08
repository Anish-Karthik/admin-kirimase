import * as z from "zod"
import { CompleteSchedule, relatedScheduleSchema, CompleteDay, relatedDaySchema, CompletePeriod, relatedPeriodSchema, CompleteFacultySubject, relatedFacultySubjectSchema, CompleteAttendanceRecord, relatedAttendanceRecordSchema } from "./index"

export const scheduleHistorySchema = z.object({
  id: z.string(),
  scheduleId: z.string(),
  dayId: z.string(),
  periodId: z.string(),
  facultySubjectId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteScheduleHistory extends z.infer<typeof scheduleHistorySchema> {
  schedule: CompleteSchedule
  day: CompleteDay
  period: CompletePeriod
  facultySubject: CompleteFacultySubject
  AttendanceRecord: CompleteAttendanceRecord[]
}

/**
 * relatedScheduleHistorySchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedScheduleHistorySchema: z.ZodSchema<CompleteScheduleHistory> = z.lazy(() => scheduleHistorySchema.extend({
  schedule: relatedScheduleSchema,
  day: relatedDaySchema,
  period: relatedPeriodSchema,
  facultySubject: relatedFacultySubjectSchema,
  AttendanceRecord: relatedAttendanceRecordSchema.array(),
}))
