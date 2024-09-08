import { db } from "@/lib/db/index";
import {
  CollegeId,
  NewCollegeParams,
  UpdateCollegeParams,
  updateCollegeSchema,
  insertCollegeSchema,
  collegeIdSchema,
} from "@/lib/db/schema/college";
import { getUserAuth } from "@/lib/auth/utils";

export const createCollege = async (college: NewCollegeParams) => {
  const { session } = await getUserAuth();
  const newCollege = insertCollegeSchema.parse({
    ...college,
    userId: session?.user.id,
  });
  try {
    const c = await db.college.create({ data: newCollege });
    return { college: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCollege = async (
  id: CollegeId,
  college: UpdateCollegeParams
) => {
  const { session } = await getUserAuth();
  const { id: collegeId } = collegeIdSchema.parse({ id });
  const newCollege = updateCollegeSchema.parse({
    ...college,
    userId: session?.user.id,
  });
  try {
    const c = await db.college.update({
      where: { id: collegeId, userId: session?.user.id },
      data: newCollege,
    });
    return { college: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCollege = async (id: CollegeId) => {
  const { session } = await getUserAuth();
  const { id: collegeId } = collegeIdSchema.parse({ id });
  try {
    const c = await db.college.delete({
      where: { id: collegeId, userId: session?.user.id },
    });
    return { college: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
