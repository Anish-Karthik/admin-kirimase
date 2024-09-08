import { departmentSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getDepartments } from "@/lib/api/department/queries";

// Schema for department - used to validate API requests
const baseSchema = departmentSchema.omit(timestamps);

export const insertDepartmentSchema = baseSchema.omit({ id: true });
export const insertDepartmentParams = baseSchema
  .extend({
    collegeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateDepartmentSchema = baseSchema;
export const updateDepartmentParams = updateDepartmentSchema
  .extend({
    collegeId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const departmentIdSchema = baseSchema.pick({ id: true });

// Types for department - used to type API request params and within Components
export type Department = z.infer<typeof departmentSchema>;
export type NewDepartment = z.infer<typeof insertDepartmentSchema>;
export type NewDepartmentParams = z.infer<typeof insertDepartmentParams>;
export type UpdateDepartmentParams = z.infer<typeof updateDepartmentParams>;
export type DepartmentId = z.infer<typeof departmentIdSchema>["id"];

// this type infers the return from getDepartment() - meaning it will include any joins
export type CompleteDepartment = Awaited<
  ReturnType<typeof getDepartments>
>["departments"][number];
