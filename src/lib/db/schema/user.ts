import { userSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getUsers } from "@/lib/api/user/queries";

// Schema for user - used to validate API requests
const baseSchema = userSchema.omit(timestamps);

export const insertUserSchema = baseSchema.omit({ id: true });
export const insertUserParams = baseSchema
  .extend({
    verified: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateUserSchema = baseSchema;
export const updateUserParams = updateUserSchema
  .extend({
    verified: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const userIdSchema = baseSchema.pick({ id: true });

// Types for user - used to type API request params and within Components
export type User = z.infer<typeof userSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type NewUserParams = z.infer<typeof insertUserParams>;
export type UpdateUserParams = z.infer<typeof updateUserParams>;
export type UserId = z.infer<typeof userIdSchema>["id"];

// this type infers the return from getUsers() - meaning it will include any joins
export type CompleteUser = Awaited<ReturnType<typeof getUsers>>["user"][number];
