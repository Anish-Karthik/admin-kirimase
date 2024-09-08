import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type ElectiveSubjectId, electiveSubjectIdSchema } from "@/lib/db/schema/electiveSubject";

export const getElectiveSubjects = async () => {
  const { session } = await getUserAuth();
  const e = await db.electiveSubject.findMany({ where: {userId: session?.user.id!}, include: { courseEnrolledStudent: true, subject: true, section: true}});
  return { electiveSubject: e };
};

export const getElectiveSubjectById = async (id: ElectiveSubjectId) => {
  const { session } = await getUserAuth();
  const { id: electiveSubjectId } = electiveSubjectIdSchema.parse({ id });
  const e = await db.electiveSubject.findFirst({
    where: { id: electiveSubjectId, userId: session?.user.id!},
    include: { courseEnrolledStudent: true, subject: true, section: true }
  });
  return { electiveSubject: e };
};


