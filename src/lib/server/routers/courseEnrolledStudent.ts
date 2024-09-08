import { getCourseEnrolledStudentById, getCourseEnrolledStudent } from "@/lib/api/courseEnrolledStudent/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseEnrolledStudentIdSchema,
  insertCourseEnrolledStudentParams,
  updateCourseEnrolledStudentParams,
} from "@/lib/db/schema/courseEnrolledStudent";
import { createCourseEnrolledStudent, deleteCourseEnrolledStudent, updateCourseEnrolledStudent } from "@/lib/api/courseEnrolledStudent/mutations";

export const courseEnrolledStudentRouter = router({
  getCourseEnrolledStudent: publicProcedure.query(async () => {
    return getCourseEnrolledStudent();
  }),
  getCourseEnrolledStudentById: publicProcedure.input(courseEnrolledStudentIdSchema).query(async ({ input }) => {
    return getCourseEnrolledStudentById(input.id);
  }),
  createCourseEnrolledStudent: publicProcedure
    .input(insertCourseEnrolledStudentParams)
    .mutation(async ({ input }) => {
      return createCourseEnrolledStudent(input);
    }),
  updateCourseEnrolledStudent: publicProcedure
    .input(updateCourseEnrolledStudentParams)
    .mutation(async ({ input }) => {
      return updateCourseEnrolledStudent(input.id, input);
    }),
  deleteCourseEnrolledStudent: publicProcedure
    .input(courseEnrolledStudentIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseEnrolledStudent(input.id);
    }),
});
