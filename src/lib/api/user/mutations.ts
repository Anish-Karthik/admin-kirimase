import { db } from "@/lib/db/index";
import {
  UserId,
  NewUserParams,
  UpdateUserParams,
  updateUserSchema,
  insertUserSchema,
  userIdSchema,
} from "@/lib/db/schema/user";
import { getUserAuth } from "@/lib/auth/utils";

export const createUser = async (user: NewUserParams) => {
  const { session } = await getUserAuth();
  const newUser = insertUserSchema.parse({ ...user, userId: session?.user.id });
  try {
    const u = await db.user.create({ data: newUser });
    return { user: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUser = async (id: UserId, user: UpdateUserParams) => {
  const { session } = await getUserAuth();
  const { id: userId } = userIdSchema.parse({ id });
  const newUser = updateUserSchema.parse({ ...user, userId: session?.user.id });
  try {
    const u = await db.user.update({
      where: { id: userId, userId: session?.user.id },
      data: newUser,
    });
    return { user: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUser = async (id: UserId) => {
  const { session } = await getUserAuth();
  const { id: userId } = userIdSchema.parse({ id });
  try {
    const u = await db.user.delete({
      where: { id: userId, userId: session?.user.id },
    });
    return { user: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
