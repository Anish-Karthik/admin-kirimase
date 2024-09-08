import { periodSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getPeriod } from "@/lib/api/period/queries";


// Schema for period - used to validate API requests
const baseSchema = periodSchema.omit(timestamps)

export const insertPeriodSchema = baseSchema.omit({ id: true });
export const insertPeriodParams = baseSchema.extend({
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  version: z.coerce.number(),
  isActive: z.coerce.boolean(),
  courseId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updatePeriodSchema = baseSchema;
export const updatePeriodParams = updatePeriodSchema.extend({
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  version: z.coerce.number(),
  isActive: z.coerce.boolean(),
  courseId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const periodIdSchema = baseSchema.pick({ id: true });

// Types for period - used to type API request params and within Components
export type Period = z.infer<typeof periodSchema>;
export type NewPeriod = z.infer<typeof insertPeriodSchema>;
export type NewPeriodParams = z.infer<typeof insertPeriodParams>;
export type UpdatePeriodParams = z.infer<typeof updatePeriodParams>;
export type PeriodId = z.infer<typeof periodIdSchema>["id"];
    
// this type infers the return from getPeriod() - meaning it will include any joins
export type CompletePeriod = Awaited<ReturnType<typeof getPeriod>>["period"][number];

