import { getFacultySubjectById, getFacultySubject } from "@/lib/api/facultySubject/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  facultySubjectIdSchema,
  insertFacultySubjectParams,
  updateFacultySubjectParams,
} from "@/lib/db/schema/facultySubject";
import { createFacultySubject, deleteFacultySubject, updateFacultySubject } from "@/lib/api/facultySubject/mutations";

export const facultySubjectRouter = router({
  getFacultySubject: publicProcedure.query(async () => {
    return getFacultySubject();
  }),
  getFacultySubjectById: publicProcedure.input(facultySubjectIdSchema).query(async ({ input }) => {
    return getFacultySubjectById(input.id);
  }),
  createFacultySubject: publicProcedure
    .input(insertFacultySubjectParams)
    .mutation(async ({ input }) => {
      return createFacultySubject(input);
    }),
  updateFacultySubject: publicProcedure
    .input(updateFacultySubjectParams)
    .mutation(async ({ input }) => {
      return updateFacultySubject(input.id, input);
    }),
  deleteFacultySubject: publicProcedure
    .input(facultySubjectIdSchema)
    .mutation(async ({ input }) => {
      return deleteFacultySubject(input.id);
    }),
});
