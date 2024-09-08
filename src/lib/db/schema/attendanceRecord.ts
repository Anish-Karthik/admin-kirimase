import { attendanceRecordSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getAttendanceRecord } from "@/lib/api/attendanceRecord/queries";


// Schema for attendanceRecord - used to validate API requests
const baseSchema = attendanceRecordSchema.omit(timestamps)

export const insertAttendanceRecordSchema = baseSchema.omit({ id: true });
export const insertAttendanceRecordParams = baseSchema.extend({
  date: z.coerce.date(),
  enrollmentId: z.coerce.string().min(1),
  scheduleId: z.coerce.string().min(1),
  isPresent: z.coerce.boolean(),
  facultyId: z.coerce.string().min(1),
  scheduleHistoryId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateAttendanceRecordSchema = baseSchema;
export const updateAttendanceRecordParams = updateAttendanceRecordSchema.extend({
  date: z.coerce.date(),
  enrollmentId: z.coerce.string().min(1),
  scheduleId: z.coerce.string().min(1),
  isPresent: z.coerce.boolean(),
  facultyId: z.coerce.string().min(1),
  scheduleHistoryId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const attendanceRecordIdSchema = baseSchema.pick({ id: true });

// Types for attendanceRecord - used to type API request params and within Components
export type AttendanceRecord = z.infer<typeof attendanceRecordSchema>;
export type NewAttendanceRecord = z.infer<typeof insertAttendanceRecordSchema>;
export type NewAttendanceRecordParams = z.infer<typeof insertAttendanceRecordParams>;
export type UpdateAttendanceRecordParams = z.infer<typeof updateAttendanceRecordParams>;
export type AttendanceRecordId = z.infer<typeof attendanceRecordIdSchema>["id"];
    
// this type infers the return from getAttendanceRecord() - meaning it will include any joins
export type CompleteAttendanceRecord = Awaited<ReturnType<typeof getAttendanceRecord>>["attendanceRecord"][number];

