import { collegeSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getCollege } from "@/lib/api/college/queries";


// Schema for college - used to validate API requests
const baseSchema = collegeSchema.omit(timestamps)

export const insertCollegeSchema = baseSchema.omit({ id: true });
export const insertCollegeParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateCollegeSchema = baseSchema;
export const updateCollegeParams = updateCollegeSchema.extend({}).omit({ 
  userId: true
});
export const collegeIdSchema = baseSchema.pick({ id: true });

// Types for college - used to type API request params and within Components
export type College = z.infer<typeof collegeSchema>;
export type NewCollege = z.infer<typeof insertCollegeSchema>;
export type NewCollegeParams = z.infer<typeof insertCollegeParams>;
export type UpdateCollegeParams = z.infer<typeof updateCollegeParams>;
export type CollegeId = z.infer<typeof collegeIdSchema>["id"];
    
// this type infers the return from getCollege() - meaning it will include any joins
export type CompleteCollege = Awaited<ReturnType<typeof getCollege>>["college"][number];

