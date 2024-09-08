import { facultySchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getFaculty } from "@/lib/api/faculty/queries";


// Schema for faculty - used to validate API requests
const baseSchema = facultySchema.omit(timestamps)

export const insertFacultySchema = baseSchema.omit({ id: true });
export const insertFacultyParams = baseSchema.extend({
  departmentId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateFacultySchema = baseSchema;
export const updateFacultyParams = updateFacultySchema.extend({
  departmentId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const facultyIdSchema = baseSchema.pick({ id: true });

// Types for faculty - used to type API request params and within Components
export type Faculty = z.infer<typeof facultySchema>;
export type NewFaculty = z.infer<typeof insertFacultySchema>;
export type NewFacultyParams = z.infer<typeof insertFacultyParams>;
export type UpdateFacultyParams = z.infer<typeof updateFacultyParams>;
export type FacultyId = z.infer<typeof facultyIdSchema>["id"];
    
// this type infers the return from getFaculty() - meaning it will include any joins
export type CompleteFaculty = Awaited<ReturnType<typeof getFaculty>>["faculty"][number];

