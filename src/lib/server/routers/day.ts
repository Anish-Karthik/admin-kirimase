import { getDayById, getDay } from "@/lib/api/day/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  dayIdSchema,
  insertDayParams,
  updateDayParams,
} from "@/lib/db/schema/day";
import { createDay, deleteDay, updateDay } from "@/lib/api/day/mutations";

export const dayRouter = router({
  getDay: publicProcedure.query(async () => {
    return getDay();
  }),
  getDayById: publicProcedure.input(dayIdSchema).query(async ({ input }) => {
    return getDayById(input.id);
  }),
  createDay: publicProcedure
    .input(insertDayParams)
    .mutation(async ({ input }) => {
      return createDay(input);
    }),
  updateDay: publicProcedure
    .input(updateDayParams)
    .mutation(async ({ input }) => {
      return updateDay(input.id, input);
    }),
  deleteDay: publicProcedure
    .input(dayIdSchema)
    .mutation(async ({ input }) => {
      return deleteDay(input.id);
    }),
});
