import { getDepartmentById, getDepartments } from "@/lib/api/department/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  departmentIdSchema,
  insertDepartmentParams,
  updateDepartmentParams,
} from "@/lib/db/schema/department";
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "@/lib/api/department/mutations";

export const departmentRouter = router({
  getDepartments: publicProcedure.query(async () => {
    return getDepartments();
  }),
  getDepartmentById: publicProcedure
    .input(departmentIdSchema)
    .query(async ({ input }) => {
      return getDepartmentById(input.id);
    }),
  createDepartment: publicProcedure
    .input(insertDepartmentParams)
    .mutation(async ({ input }) => {
      return createDepartment(input);
    }),
  updateDepartment: publicProcedure
    .input(updateDepartmentParams)
    .mutation(async ({ input }) => {
      return updateDepartment(input.id, input);
    }),
  deleteDepartment: publicProcedure
    .input(departmentIdSchema)
    .mutation(async ({ input }) => {
      return deleteDepartment(input.id);
    }),
});
