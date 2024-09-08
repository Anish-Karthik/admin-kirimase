import { db } from "@/lib/db/index";
import {
  StudentId,
  NewStudentParams,
  UpdateStudentParams,
  updateStudentSchema,
  insertStudentSchema,
  studentIdSchema,
} from "@/lib/db/schema/student";
import { getUserAuth } from "@/lib/auth/utils";

export const createStudent = async (student: NewStudentParams) => {
  const { session } = await getUserAuth();
  const newStudent = insertStudentSchema.parse({
    ...student,
    userId: session?.user.id,
  });
  try {
    const s = await db.student.create({ data: newStudent });
    return { student: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateStudent = async (
  id: StudentId,
  student: UpdateStudentParams
) => {
  const { session } = await getUserAuth();
  const { id: studentId } = studentIdSchema.parse({ id });
  const newStudent = updateStudentSchema.parse({
    ...student,
    userId: session?.user.id,
  });
  try {
    const s = await db.student.update({
      where: { id: studentId, userId: session?.user.id },
      data: newStudent,
    });
    return { student: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteStudent = async (id: StudentId) => {
  const { session } = await getUserAuth();
  const { id: studentId } = studentIdSchema.parse({ id });
  try {
    const s = await db.student.delete({
      where: { id: studentId, userId: session?.user.id },
    });
    return { student: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
