import { getElectiveSubjectById, getElectiveSubject } from "@/lib/api/electiveSubject/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  electiveSubjectIdSchema,
  insertElectiveSubjectParams,
  updateElectiveSubjectParams,
} from "@/lib/db/schema/electiveSubject";
import { createElectiveSubject, deleteElectiveSubject, updateElectiveSubject } from "@/lib/api/electiveSubject/mutations";

export const electiveSubjectRouter = router({
  getElectiveSubject: publicProcedure.query(async () => {
    return getElectiveSubject();
  }),
  getElectiveSubjectById: publicProcedure.input(electiveSubjectIdSchema).query(async ({ input }) => {
    return getElectiveSubjectById(input.id);
  }),
  createElectiveSubject: publicProcedure
    .input(insertElectiveSubjectParams)
    .mutation(async ({ input }) => {
      return createElectiveSubject(input);
    }),
  updateElectiveSubject: publicProcedure
    .input(updateElectiveSubjectParams)
    .mutation(async ({ input }) => {
      return updateElectiveSubject(input.id, input);
    }),
  deleteElectiveSubject: publicProcedure
    .input(electiveSubjectIdSchema)
    .mutation(async ({ input }) => {
      return deleteElectiveSubject(input.id);
    }),
});
