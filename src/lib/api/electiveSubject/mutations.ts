import { db } from "@/lib/db/index";
import {
  ElectiveSubjectId,
  NewElectiveSubjectParams,
  UpdateElectiveSubjectParams,
  updateElectiveSubjectSchema,
  insertElectiveSubjectSchema,
  electiveSubjectIdSchema,
} from "@/lib/db/schema/electiveSubject";
import { getUserAuth } from "@/lib/auth/utils";

export const createElectiveSubject = async (
  electiveSubject: NewElectiveSubjectParams
) => {
  const { session } = await getUserAuth();
  const newElectiveSubject = insertElectiveSubjectSchema.parse({
    ...electiveSubject,
    userId: session?.user.id,
  });
  try {
    const e = await db.electiveSubject.create({ data: newElectiveSubject });
    return { electiveSubject: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateElectiveSubject = async (
  id: ElectiveSubjectId,
  electiveSubject: UpdateElectiveSubjectParams
) => {
  const { session } = await getUserAuth();
  const { id: electiveSubjectId } = electiveSubjectIdSchema.parse({ id });
  const newElectiveSubject = updateElectiveSubjectSchema.parse({
    ...electiveSubject,
    userId: session?.user.id,
  });
  try {
    const e = await db.electiveSubject.update({
      where: { id: electiveSubjectId, userId: session?.user.id },
      data: newElectiveSubject,
    });
    return { electiveSubject: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteElectiveSubject = async (id: ElectiveSubjectId) => {
  const { session } = await getUserAuth();
  const { id: electiveSubjectId } = electiveSubjectIdSchema.parse({ id });
  try {
    const e = await db.electiveSubject.delete({
      where: { id: electiveSubjectId, userId: session?.user.id },
    });
    return { electiveSubject: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
