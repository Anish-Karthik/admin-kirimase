import { enrollmentSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getEnrollment } from "@/lib/api/enrollment/queries";


// Schema for enrollment - used to validate API requests
const baseSchema = enrollmentSchema.omit(timestamps)

export const insertEnrollmentSchema = baseSchema.omit({ id: true });
export const insertEnrollmentParams = baseSchema.extend({
  rollNumber: z.coerce.number(),
  courseEnrolledStudentId: z.coerce.string().min(1),
  sectionId: z.coerce.string().min(1),
  joinedAt: z.coerce.date(),
  leftAt: z.coerce.date()
}).omit({ 
  id: true,
  userId: true
});

export const updateEnrollmentSchema = baseSchema;
export const updateEnrollmentParams = updateEnrollmentSchema.extend({
  rollNumber: z.coerce.number(),
  courseEnrolledStudentId: z.coerce.string().min(1),
  sectionId: z.coerce.string().min(1),
  joinedAt: z.coerce.date(),
  leftAt: z.coerce.date()
}).omit({ 
  userId: true
});
export const enrollmentIdSchema = baseSchema.pick({ id: true });

// Types for enrollment - used to type API request params and within Components
export type Enrollment = z.infer<typeof enrollmentSchema>;
export type NewEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type NewEnrollmentParams = z.infer<typeof insertEnrollmentParams>;
export type UpdateEnrollmentParams = z.infer<typeof updateEnrollmentParams>;
export type EnrollmentId = z.infer<typeof enrollmentIdSchema>["id"];
    
// this type infers the return from getEnrollment() - meaning it will include any joins
export type CompleteEnrollment = Awaited<ReturnType<typeof getEnrollment>>["enrollment"][number];

