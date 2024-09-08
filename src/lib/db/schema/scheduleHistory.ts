import { scheduleHistorySchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getScheduleHistory } from "@/lib/api/scheduleHistory/queries";


// Schema for scheduleHistory - used to validate API requests
const baseSchema = scheduleHistorySchema.omit(timestamps)

export const insertScheduleHistorySchema = baseSchema.omit({ id: true });
export const insertScheduleHistoryParams = baseSchema.extend({
  scheduleId: z.coerce.string().min(1),
  dayId: z.coerce.string().min(1),
  periodId: z.coerce.string().min(1),
  facultySubjectId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateScheduleHistorySchema = baseSchema;
export const updateScheduleHistoryParams = updateScheduleHistorySchema.extend({
  scheduleId: z.coerce.string().min(1),
  dayId: z.coerce.string().min(1),
  periodId: z.coerce.string().min(1),
  facultySubjectId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const scheduleHistoryIdSchema = baseSchema.pick({ id: true });

// Types for scheduleHistory - used to type API request params and within Components
export type ScheduleHistory = z.infer<typeof scheduleHistorySchema>;
export type NewScheduleHistory = z.infer<typeof insertScheduleHistorySchema>;
export type NewScheduleHistoryParams = z.infer<typeof insertScheduleHistoryParams>;
export type UpdateScheduleHistoryParams = z.infer<typeof updateScheduleHistoryParams>;
export type ScheduleHistoryId = z.infer<typeof scheduleHistoryIdSchema>["id"];
    
// this type infers the return from getScheduleHistory() - meaning it will include any joins
export type CompleteScheduleHistory = Awaited<ReturnType<typeof getScheduleHistory>>["scheduleHistory"][number];

