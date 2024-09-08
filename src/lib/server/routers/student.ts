import { getStudentById, getStudent } from "@/lib/api/student/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  studentIdSchema,
  insertStudentParams,
  updateStudentParams,
} from "@/lib/db/schema/student";
import { createStudent, deleteStudent, updateStudent } from "@/lib/api/student/mutations";

export const studentRouter = router({
  getStudent: publicProcedure.query(async () => {
    return getStudent();
  }),
  getStudentById: publicProcedure.input(studentIdSchema).query(async ({ input }) => {
    return getStudentById(input.id);
  }),
  createStudent: publicProcedure
    .input(insertStudentParams)
    .mutation(async ({ input }) => {
      return createStudent(input);
    }),
  updateStudent: publicProcedure
    .input(updateStudentParams)
    .mutation(async ({ input }) => {
      return updateStudent(input.id, input);
    }),
  deleteStudent: publicProcedure
    .input(studentIdSchema)
    .mutation(async ({ input }) => {
      return deleteStudent(input.id);
    }),
});
