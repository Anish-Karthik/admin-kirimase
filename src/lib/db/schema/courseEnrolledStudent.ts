import { courseEnrolledStudentSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getCourseEnrolledStudent } from "@/lib/api/courseEnrolledStudent/queries";


// Schema for courseEnrolledStudent - used to validate API requests
const baseSchema = courseEnrolledStudentSchema.omit(timestamps)

export const insertCourseEnrolledStudentSchema = baseSchema.omit({ id: true });
export const insertCourseEnrolledStudentParams = baseSchema.extend({
  batchYear: z.coerce.number(),
  courseId: z.coerce.string().min(1),
  studentId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateCourseEnrolledStudentSchema = baseSchema;
export const updateCourseEnrolledStudentParams = updateCourseEnrolledStudentSchema.extend({
  batchYear: z.coerce.number(),
  courseId: z.coerce.string().min(1),
  studentId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const courseEnrolledStudentIdSchema = baseSchema.pick({ id: true });

// Types for courseEnrolledStudent - used to type API request params and within Components
export type CourseEnrolledStudent = z.infer<typeof courseEnrolledStudentSchema>;
export type NewCourseEnrolledStudent = z.infer<typeof insertCourseEnrolledStudentSchema>;
export type NewCourseEnrolledStudentParams = z.infer<typeof insertCourseEnrolledStudentParams>;
export type UpdateCourseEnrolledStudentParams = z.infer<typeof updateCourseEnrolledStudentParams>;
export type CourseEnrolledStudentId = z.infer<typeof courseEnrolledStudentIdSchema>["id"];
    
// this type infers the return from getCourseEnrolledStudent() - meaning it will include any joins
export type CompleteCourseEnrolledStudent = Awaited<ReturnType<typeof getCourseEnrolledStudent>>["courseEnrolledStudent"][number];

