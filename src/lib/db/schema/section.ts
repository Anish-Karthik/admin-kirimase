import { sectionSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getSection } from "@/lib/api/section/queries";


// Schema for section - used to validate API requests
const baseSchema = sectionSchema.omit(timestamps)

export const insertSectionSchema = baseSchema.omit({ id: true });
export const insertSectionParams = baseSchema.extend({
  batchYear: z.coerce.number(),
  semester: z.coerce.number(),
  courseId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateSectionSchema = baseSchema;
export const updateSectionParams = updateSectionSchema.extend({
  batchYear: z.coerce.number(),
  semester: z.coerce.number(),
  courseId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const sectionIdSchema = baseSchema.pick({ id: true });

// Types for section - used to type API request params and within Components
export type Section = z.infer<typeof sectionSchema>;
export type NewSection = z.infer<typeof insertSectionSchema>;
export type NewSectionParams = z.infer<typeof insertSectionParams>;
export type UpdateSectionParams = z.infer<typeof updateSectionParams>;
export type SectionId = z.infer<typeof sectionIdSchema>["id"];
    
// this type infers the return from getSection() - meaning it will include any joins
export type CompleteSection = Awaited<ReturnType<typeof getSection>>["section"][number];

