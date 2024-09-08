import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type CollegeId, collegeIdSchema } from "@/lib/db/schema/college";

export const getColleges = async () => {
  const { session } = await getUserAuth();
  const c = await db.college.findMany({ where: {userId: session?.user.id!}});
  return { college: c };
};

export const getCollegeById = async (id: CollegeId) => {
  const { session } = await getUserAuth();
  const { id: collegeId } = collegeIdSchema.parse({ id });
  const c = await db.college.findFirst({
    where: { id: collegeId, userId: session?.user.id!}});
  return { college: c };
};


