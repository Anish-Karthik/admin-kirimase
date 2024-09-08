import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type FacultySubjectId, facultySubjectIdSchema } from "@/lib/db/schema/facultySubject";

export const getFacultySubjects = async () => {
  const { session } = await getUserAuth();
  const f = await db.facultySubject.findMany({ where: {userId: session?.user.id!}, include: { subject: true, faculty: true}});
  return { facultySubject: f };
};

export const getFacultySubjectById = async (id: FacultySubjectId) => {
  const { session } = await getUserAuth();
  const { id: facultySubjectId } = facultySubjectIdSchema.parse({ id });
  const f = await db.facultySubject.findFirst({
    where: { id: facultySubjectId, userId: session?.user.id!},
    include: { subject: true, faculty: true }
  });
  return { facultySubject: f };
};


