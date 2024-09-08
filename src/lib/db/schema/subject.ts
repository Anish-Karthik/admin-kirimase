import { subjectSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getSubject } from "@/lib/api/subject/queries";


// Schema for subject - used to validate API requests
const baseSchema = subjectSchema.omit(timestamps)

export const insertSubjectSchema = baseSchema.omit({ id: true });
export const insertSubjectParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateSubjectSchema = baseSchema;
export const updateSubjectParams = updateSubjectSchema.extend({}).omit({ 
  userId: true
});
export const subjectIdSchema = baseSchema.pick({ id: true });

// Types for subject - used to type API request params and within Components
export type Subject = z.infer<typeof subjectSchema>;
export type NewSubject = z.infer<typeof insertSubjectSchema>;
export type NewSubjectParams = z.infer<typeof insertSubjectParams>;
export type UpdateSubjectParams = z.infer<typeof updateSubjectParams>;
export type SubjectId = z.infer<typeof subjectIdSchema>["id"];
    
// this type infers the return from getSubject() - meaning it will include any joins
export type CompleteSubject = Awaited<ReturnType<typeof getSubject>>["subject"][number];

