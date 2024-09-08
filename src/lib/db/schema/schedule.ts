import { scheduleSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getSchedule } from "@/lib/api/schedule/queries";


// Schema for schedule - used to validate API requests
const baseSchema = scheduleSchema.omit(timestamps)

export const insertScheduleSchema = baseSchema.omit({ id: true });
export const insertScheduleParams = baseSchema.extend({
  dayId: z.coerce.string().min(1),
  periodId: z.coerce.string().min(1),
  facultySubjectId: z.coerce.string().min(1),
  sectionId: z.coerce.string().min(1),
  version: z.coerce.number(),
  isActive: z.coerce.boolean(),
  isDeleted: z.coerce.boolean(),
  isArchived: z.coerce.boolean()
}).omit({ 
  id: true,
  userId: true
});

export const updateScheduleSchema = baseSchema;
export const updateScheduleParams = updateScheduleSchema.extend({
  dayId: z.coerce.string().min(1),
  periodId: z.coerce.string().min(1),
  facultySubjectId: z.coerce.string().min(1),
  sectionId: z.coerce.string().min(1),
  version: z.coerce.number(),
  isActive: z.coerce.boolean(),
  isDeleted: z.coerce.boolean(),
  isArchived: z.coerce.boolean()
}).omit({ 
  userId: true
});
export const scheduleIdSchema = baseSchema.pick({ id: true });

// Types for schedule - used to type API request params and within Components
export type Schedule = z.infer<typeof scheduleSchema>;
export type NewSchedule = z.infer<typeof insertScheduleSchema>;
export type NewScheduleParams = z.infer<typeof insertScheduleParams>;
export type UpdateScheduleParams = z.infer<typeof updateScheduleParams>;
export type ScheduleId = z.infer<typeof scheduleIdSchema>["id"];
    
// this type infers the return from getSchedule() - meaning it will include any joins
export type CompleteSchedule = Awaited<ReturnType<typeof getSchedule>>["schedule"][number];

