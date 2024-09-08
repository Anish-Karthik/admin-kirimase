import { getEnrollmentById, getEnrollment } from "@/lib/api/enrollment/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrollmentIdSchema,
  insertEnrollmentParams,
  updateEnrollmentParams,
} from "@/lib/db/schema/enrollment";
import { createEnrollment, deleteEnrollment, updateEnrollment } from "@/lib/api/enrollment/mutations";

export const enrollmentRouter = router({
  getEnrollment: publicProcedure.query(async () => {
    return getEnrollment();
  }),
  getEnrollmentById: publicProcedure.input(enrollmentIdSchema).query(async ({ input }) => {
    return getEnrollmentById(input.id);
  }),
  createEnrollment: publicProcedure
    .input(insertEnrollmentParams)
    .mutation(async ({ input }) => {
      return createEnrollment(input);
    }),
  updateEnrollment: publicProcedure
    .input(updateEnrollmentParams)
    .mutation(async ({ input }) => {
      return updateEnrollment(input.id, input);
    }),
  deleteEnrollment: publicProcedure
    .input(enrollmentIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrollment(input.id);
    }),
});
