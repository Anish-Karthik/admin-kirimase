import { getUserById, getUser } from "@/lib/api/user/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userIdSchema,
  insertUserParams,
  updateUserParams,
} from "@/lib/db/schema/user";
import { createUser, deleteUser, updateUser } from "@/lib/api/user/mutations";

export const userRouter = router({
  getUser: publicProcedure.query(async () => {
    return getUser();
  }),
  getUserById: publicProcedure.input(userIdSchema).query(async ({ input }) => {
    return getUserById(input.id);
  }),
  createUser: publicProcedure
    .input(insertUserParams)
    .mutation(async ({ input }) => {
      return createUser(input);
    }),
  updateUser: publicProcedure
    .input(updateUserParams)
    .mutation(async ({ input }) => {
      return updateUser(input.id, input);
    }),
  deleteUser: publicProcedure
    .input(userIdSchema)
    .mutation(async ({ input }) => {
      return deleteUser(input.id);
    }),
});
