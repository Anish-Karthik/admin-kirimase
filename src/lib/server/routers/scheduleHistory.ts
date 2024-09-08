import { getScheduleHistoryById, getScheduleHistory } from "@/lib/api/scheduleHistory/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  scheduleHistoryIdSchema,
  insertScheduleHistoryParams,
  updateScheduleHistoryParams,
} from "@/lib/db/schema/scheduleHistory";
import { createScheduleHistory, deleteScheduleHistory, updateScheduleHistory } from "@/lib/api/scheduleHistory/mutations";

export const scheduleHistoryRouter = router({
  getScheduleHistory: publicProcedure.query(async () => {
    return getScheduleHistory();
  }),
  getScheduleHistoryById: publicProcedure.input(scheduleHistoryIdSchema).query(async ({ input }) => {
    return getScheduleHistoryById(input.id);
  }),
  createScheduleHistory: publicProcedure
    .input(insertScheduleHistoryParams)
    .mutation(async ({ input }) => {
      return createScheduleHistory(input);
    }),
  updateScheduleHistory: publicProcedure
    .input(updateScheduleHistoryParams)
    .mutation(async ({ input }) => {
      return updateScheduleHistory(input.id, input);
    }),
  deleteScheduleHistory: publicProcedure
    .input(scheduleHistoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteScheduleHistory(input.id);
    }),
});
