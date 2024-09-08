import { electiveSubjectSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getElectiveSubject } from "@/lib/api/electiveSubject/queries";


// Schema for electiveSubject - used to validate API requests
const baseSchema = electiveSubjectSchema.omit(timestamps)

export const insertElectiveSubjectSchema = baseSchema.omit({ id: true });
export const insertElectiveSubjectParams = baseSchema.extend({
  courseEnrolledStudentId: z.coerce.string().min(1),
  subjectId: z.coerce.string().min(1),
  sectionId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateElectiveSubjectSchema = baseSchema;
export const updateElectiveSubjectParams = updateElectiveSubjectSchema.extend({
  courseEnrolledStudentId: z.coerce.string().min(1),
  subjectId: z.coerce.string().min(1),
  sectionId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const electiveSubjectIdSchema = baseSchema.pick({ id: true });

// Types for electiveSubject - used to type API request params and within Components
export type ElectiveSubject = z.infer<typeof electiveSubjectSchema>;
export type NewElectiveSubject = z.infer<typeof insertElectiveSubjectSchema>;
export type NewElectiveSubjectParams = z.infer<typeof insertElectiveSubjectParams>;
export type UpdateElectiveSubjectParams = z.infer<typeof updateElectiveSubjectParams>;
export type ElectiveSubjectId = z.infer<typeof electiveSubjectIdSchema>["id"];
    
// this type infers the return from getElectiveSubject() - meaning it will include any joins
export type CompleteElectiveSubject = Awaited<ReturnType<typeof getElectiveSubject>>["electiveSubject"][number];

