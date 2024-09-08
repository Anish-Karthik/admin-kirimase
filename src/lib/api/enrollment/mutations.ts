import { db } from "@/lib/db/index";
import {
  EnrollmentId,
  NewEnrollmentParams,
  UpdateEnrollmentParams,
  updateEnrollmentSchema,
  insertEnrollmentSchema,
  enrollmentIdSchema,
} from "@/lib/db/schema/enrollment";
import { getUserAuth } from "@/lib/auth/utils";

export const createEnrollment = async (enrollment: NewEnrollmentParams) => {
  const { session } = await getUserAuth();
  const newEnrollment = insertEnrollmentSchema.parse({
    ...enrollment,
    userId: session?.user.id,
  });
  try {
    const e = await db.enrollment.create({ data: newEnrollment });
    return { enrollment: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrollment = async (
  id: EnrollmentId,
  enrollment: UpdateEnrollmentParams
) => {
  const { session } = await getUserAuth();
  const { id: enrollmentId } = enrollmentIdSchema.parse({ id });
  const newEnrollment = updateEnrollmentSchema.parse({
    ...enrollment,
    userId: session?.user.id,
  });
  try {
    const e = await db.enrollment.update({
      where: { id: enrollmentId, userId: session?.user.id },
      data: newEnrollment,
    });
    return { enrollment: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrollment = async (id: EnrollmentId) => {
  const { session } = await getUserAuth();
  const { id: enrollmentId } = enrollmentIdSchema.parse({ id });
  try {
    const e = await db.enrollment.delete({
      where: { id: enrollmentId, userId: session?.user.id },
    });
    return { enrollment: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
