import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type EnrollmentId, enrollmentIdSchema } from "@/lib/db/schema/enrollment";

export const getEnrollments = async () => {
  const { session } = await getUserAuth();
  const e = await db.enrollment.findMany({ where: {userId: session?.user.id!}, include: { courseEnrolledStudent: true, section: true}});
  return { enrollment: e };
};

export const getEnrollmentById = async (id: EnrollmentId) => {
  const { session } = await getUserAuth();
  const { id: enrollmentId } = enrollmentIdSchema.parse({ id });
  const e = await db.enrollment.findFirst({
    where: { id: enrollmentId, userId: session?.user.id!},
    include: { courseEnrolledStudent: true, section: true }
  });
  return { enrollment: e };
};


