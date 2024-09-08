import { getPeriodById, getPeriod } from "@/lib/api/period/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  periodIdSchema,
  insertPeriodParams,
  updatePeriodParams,
} from "@/lib/db/schema/period";
import { createPeriod, deletePeriod, updatePeriod } from "@/lib/api/period/mutations";

export const periodRouter = router({
  getPeriod: publicProcedure.query(async () => {
    return getPeriod();
  }),
  getPeriodById: publicProcedure.input(periodIdSchema).query(async ({ input }) => {
    return getPeriodById(input.id);
  }),
  createPeriod: publicProcedure
    .input(insertPeriodParams)
    .mutation(async ({ input }) => {
      return createPeriod(input);
    }),
  updatePeriod: publicProcedure
    .input(updatePeriodParams)
    .mutation(async ({ input }) => {
      return updatePeriod(input.id, input);
    }),
  deletePeriod: publicProcedure
    .input(periodIdSchema)
    .mutation(async ({ input }) => {
      return deletePeriod(input.id);
    }),
});
