import { holidaySchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getHoliday } from "@/lib/api/holiday/queries";

// Schema for holiday - used to validate API requests
const baseSchema = holidaySchema.omit(timestamps);

export const insertHolidaySchema = baseSchema.omit({ id: true });
export const insertHolidayParams = baseSchema
  .extend({
    date: z.coerce.date(),
    collegeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateHolidaySchema = baseSchema;
export const updateHolidayParams = updateHolidaySchema
  .extend({
    date: z.coerce.date(),
    collegeId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const holidayIdSchema = baseSchema.pick({ id: true });

// Types for holiday - used to type API request params and within Components
export type Holiday = z.infer<typeof holidaySchema>;
export type NewHoliday = z.infer<typeof insertHolidaySchema>;
export type NewHolidayParams = z.infer<typeof insertHolidayParams>;
export type UpdateHolidayParams = z.infer<typeof updateHolidayParams>;
export type HolidayId = z.infer<typeof holidayIdSchema>["id"];

// this type infers the return from getHolidays() - meaning it will include any joins
export type CompleteHoliday = Awaited<
  ReturnType<typeof getHoliday>
>["holiday"][number];
