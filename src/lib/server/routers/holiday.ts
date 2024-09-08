import { getHolidayById, getHoliday } from "@/lib/api/holiday/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  holidayIdSchema,
  insertHolidayParams,
  updateHolidayParams,
} from "@/lib/db/schema/holiday";
import {
  createHoliday,
  deleteHoliday,
  updateHoliday,
} from "@/lib/api/holiday/mutations";

export const holidayRouter = router({
  getHoliday: publicProcedure.query(async () => {
    return getHoliday();
  }),
  getHolidayById: publicProcedure
    .input(holidayIdSchema)
    .query(async ({ input }) => {
      return getHolidayById(input.id);
    }),
  createHoliday: publicProcedure
    .input(insertHolidayParams)
    .mutation(async ({ input }) => {
      return createHoliday(input);
    }),
  updateHoliday: publicProcedure
    .input(updateHolidayParams)
    .mutation(async ({ input }) => {
      return updateHoliday(input.id, input);
    }),
  deleteHoliday: publicProcedure
    .input(holidayIdSchema)
    .mutation(async ({ input }) => {
      return deleteHoliday(input.id);
    }),
});
