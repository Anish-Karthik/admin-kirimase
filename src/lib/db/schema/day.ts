import { daySchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getDay } from "@/lib/api/day/queries";


// Schema for day - used to validate API requests
const baseSchema = daySchema.omit(timestamps)

export const insertDaySchema = baseSchema.omit({ id: true });
export const insertDayParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateDaySchema = baseSchema;
export const updateDayParams = updateDaySchema.extend({}).omit({ 
  userId: true
});
export const dayIdSchema = baseSchema.pick({ id: true });

// Types for day - used to type API request params and within Components
export type Day = z.infer<typeof daySchema>;
export type NewDay = z.infer<typeof insertDaySchema>;
export type NewDayParams = z.infer<typeof insertDayParams>;
export type UpdateDayParams = z.infer<typeof updateDayParams>;
export type DayId = z.infer<typeof dayIdSchema>["id"];
    
// this type infers the return from getDay() - meaning it will include any joins
export type CompleteDay = Awaited<ReturnType<typeof getDay>>["day"][number];

