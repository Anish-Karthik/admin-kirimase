import { getFacultyById, getFaculty } from "@/lib/api/faculty/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  facultyIdSchema,
  insertFacultyParams,
  updateFacultyParams,
} from "@/lib/db/schema/faculty";
import { createFaculty, deleteFaculty, updateFaculty } from "@/lib/api/faculty/mutations";

export const facultyRouter = router({
  getFaculty: publicProcedure.query(async () => {
    return getFaculty();
  }),
  getFacultyById: publicProcedure.input(facultyIdSchema).query(async ({ input }) => {
    return getFacultyById(input.id);
  }),
  createFaculty: publicProcedure
    .input(insertFacultyParams)
    .mutation(async ({ input }) => {
      return createFaculty(input);
    }),
  updateFaculty: publicProcedure
    .input(updateFacultyParams)
    .mutation(async ({ input }) => {
      return updateFaculty(input.id, input);
    }),
  deleteFaculty: publicProcedure
    .input(facultyIdSchema)
    .mutation(async ({ input }) => {
      return deleteFaculty(input.id);
    }),
});
