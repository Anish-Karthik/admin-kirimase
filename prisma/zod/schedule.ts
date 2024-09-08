import * as z from "zod"
import { CompleteDay, relatedDaySchema, CompletePeriod, relatedPeriodSchema, CompleteFacultySubject, relatedFacultySubjectSchema, CompleteSection, relatedSectionSchema, CompleteScheduleHistory, relatedScheduleHistorySchema } from "./index"

export const scheduleSchema = z.object({
  id: z.string(),
  dayId: z.string(),
  periodId: z.string(),
  facultySubjectId: z.string(),
  sectionId: z.string(),
  version: z.number().int(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  isArchived: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSchedule extends z.infer<typeof scheduleSchema> {
  day: CompleteDay
  period: CompletePeriod
  facultySubject: CompleteFacultySubject
  section: CompleteSection
  scheduleHistory: CompleteScheduleHistory[]
}

/**
 * relatedScheduleSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedScheduleSchema: z.ZodSchema<CompleteSchedule> = z.lazy(() => scheduleSchema.extend({
  day: relatedDaySchema,
  period: relatedPeriodSchema,
  facultySubject: relatedFacultySubjectSchema,
  section: relatedSectionSchema,
  scheduleHistory: relatedScheduleHistorySchema.array(),
}))
