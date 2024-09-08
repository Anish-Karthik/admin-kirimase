import * as z from "zod"
import { CompleteElectiveSubject, relatedElectiveSubjectSchema } from "./index"

export const subjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  electiveName: z.string().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSubject extends z.infer<typeof subjectSchema> {
  ElectiveSubject: CompleteElectiveSubject[]
}

/**
 * relatedSubjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSubjectSchema: z.ZodSchema<CompleteSubject> = z.lazy(() => subjectSchema.extend({
  ElectiveSubject: relatedElectiveSubjectSchema.array(),
}))
