import { getCourseById, getCourse } from "@/lib/api/course/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseIdSchema,
  insertCourseParams,
  updateCourseParams,
} from "@/lib/db/schema/course";
import { createCourse, deleteCourse, updateCourse } from "@/lib/api/course/mutations";

export const courseRouter = router({
  getCourse: publicProcedure.query(async () => {
    return getCourse();
  }),
  getCourseById: publicProcedure.input(courseIdSchema).query(async ({ input }) => {
    return getCourseById(input.id);
  }),
  createCourse: publicProcedure
    .input(insertCourseParams)
    .mutation(async ({ input }) => {
      return createCourse(input);
    }),
  updateCourse: publicProcedure
    .input(updateCourseParams)
    .mutation(async ({ input }) => {
      return updateCourse(input.id, input);
    }),
  deleteCourse: publicProcedure
    .input(courseIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourse(input.id);
    }),
});
