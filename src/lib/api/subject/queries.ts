import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type SubjectId, subjectIdSchema } from "@/lib/db/schema/subject";

export const getSubjects = async () => {
  const { session } = await getUserAuth();
  const s = await db.subject.findMany({ where: {userId: session?.user.id!}});
  return { subject: s };
};

export const getSubjectById = async (id: SubjectId) => {
  const { session } = await getUserAuth();
  const { id: subjectId } = subjectIdSchema.parse({ id });
  const s = await db.subject.findFirst({
    where: { id: subjectId, userId: session?.user.id!}});
  return { subject: s };
};


