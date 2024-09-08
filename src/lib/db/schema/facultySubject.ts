import { facultySubjectSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getFacultySubject } from "@/lib/api/facultySubject/queries";


// Schema for facultySubject - used to validate API requests
const baseSchema = facultySubjectSchema.omit(timestamps)

export const insertFacultySubjectSchema = baseSchema.omit({ id: true });
export const insertFacultySubjectParams = baseSchema.extend({
  subjectId: z.coerce.string().min(1),
  facultyId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateFacultySubjectSchema = baseSchema;
export const updateFacultySubjectParams = updateFacultySubjectSchema.extend({
  subjectId: z.coerce.string().min(1),
  facultyId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const facultySubjectIdSchema = baseSchema.pick({ id: true });

// Types for facultySubject - used to type API request params and within Components
export type FacultySubject = z.infer<typeof facultySubjectSchema>;
export type NewFacultySubject = z.infer<typeof insertFacultySubjectSchema>;
export type NewFacultySubjectParams = z.infer<typeof insertFacultySubjectParams>;
export type UpdateFacultySubjectParams = z.infer<typeof updateFacultySubjectParams>;
export type FacultySubjectId = z.infer<typeof facultySubjectIdSchema>["id"];
    
// this type infers the return from getFacultySubject() - meaning it will include any joins
export type CompleteFacultySubject = Awaited<ReturnType<typeof getFacultySubject>>["facultySubject"][number];

