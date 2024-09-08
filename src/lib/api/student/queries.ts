import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type StudentId, studentIdSchema } from "@/lib/db/schema/student";

export const getStudent = async () => {
  const { session } = await getUserAuth();
  const s = await db.student.findMany({ where: { userId: session?.user.id } });
  return { student: s };
};

export const getStudentById = async (id: StudentId) => {
  const { session } = await getUserAuth();
  const { id: studentId } = studentIdSchema.parse({ id });
  const s = await db.student.findFirst({
    where: { id: studentId, userId: session?.user.id },
  });
  return { student: s };
};
