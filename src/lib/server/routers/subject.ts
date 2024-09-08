import { getSubjectById, getSubject } from "@/lib/api/subject/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  subjectIdSchema,
  insertSubjectParams,
  updateSubjectParams,
} from "@/lib/db/schema/subject";
import { createSubject, deleteSubject, updateSubject } from "@/lib/api/subject/mutations";

export const subjectRouter = router({
  getSubject: publicProcedure.query(async () => {
    return getSubject();
  }),
  getSubjectById: publicProcedure.input(subjectIdSchema).query(async ({ input }) => {
    return getSubjectById(input.id);
  }),
  createSubject: publicProcedure
    .input(insertSubjectParams)
    .mutation(async ({ input }) => {
      return createSubject(input);
    }),
  updateSubject: publicProcedure
    .input(updateSubjectParams)
    .mutation(async ({ input }) => {
      return updateSubject(input.id, input);
    }),
  deleteSubject: publicProcedure
    .input(subjectIdSchema)
    .mutation(async ({ input }) => {
      return deleteSubject(input.id);
    }),
});
