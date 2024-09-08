import { getScheduleById, getSchedule } from "@/lib/api/schedule/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  scheduleIdSchema,
  insertScheduleParams,
  updateScheduleParams,
} from "@/lib/db/schema/schedule";
import { createSchedule, deleteSchedule, updateSchedule } from "@/lib/api/schedule/mutations";

export const scheduleRouter = router({
  getSchedule: publicProcedure.query(async () => {
    return getSchedule();
  }),
  getScheduleById: publicProcedure.input(scheduleIdSchema).query(async ({ input }) => {
    return getScheduleById(input.id);
  }),
  createSchedule: publicProcedure
    .input(insertScheduleParams)
    .mutation(async ({ input }) => {
      return createSchedule(input);
    }),
  updateSchedule: publicProcedure
    .input(updateScheduleParams)
    .mutation(async ({ input }) => {
      return updateSchedule(input.id, input);
    }),
  deleteSchedule: publicProcedure
    .input(scheduleIdSchema)
    .mutation(async ({ input }) => {
      return deleteSchedule(input.id);
    }),
});
