import { courseSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getCourse } from "@/lib/api/course/queries";


// Schema for course - used to validate API requests
const baseSchema = courseSchema.omit(timestamps)

export const insertCourseSchema = baseSchema.omit({ id: true });
export const insertCourseParams = baseSchema.extend({
  departmentId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateCourseSchema = baseSchema;
export const updateCourseParams = updateCourseSchema.extend({
  departmentId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const courseIdSchema = baseSchema.pick({ id: true });

// Types for course - used to type API request params and within Components
export type Course = z.infer<typeof courseSchema>;
export type NewCourse = z.infer<typeof insertCourseSchema>;
export type NewCourseParams = z.infer<typeof insertCourseParams>;
export type UpdateCourseParams = z.infer<typeof updateCourseParams>;
export type CourseId = z.infer<typeof courseIdSchema>["id"];
    
// this type infers the return from getCourse() - meaning it will include any joins
export type CompleteCourse = Awaited<ReturnType<typeof getCourse>>["course"][number];

