import { studentSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getStudent } from "@/lib/api/student/queries";


// Schema for student - used to validate API requests
const baseSchema = studentSchema.omit(timestamps)

export const insertStudentSchema = baseSchema.omit({ id: true });
export const insertStudentParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateStudentSchema = baseSchema;
export const updateStudentParams = updateStudentSchema.extend({}).omit({ 
  userId: true
});
export const studentIdSchema = baseSchema.pick({ id: true });

// Types for student - used to type API request params and within Components
export type Student = z.infer<typeof studentSchema>;
export type NewStudent = z.infer<typeof insertStudentSchema>;
export type NewStudentParams = z.infer<typeof insertStudentParams>;
export type UpdateStudentParams = z.infer<typeof updateStudentParams>;
export type StudentId = z.infer<typeof studentIdSchema>["id"];
    
// this type infers the return from getStudent() - meaning it will include any joins
export type CompleteStudent = Awaited<ReturnType<typeof getStudent>>["student"][number];

