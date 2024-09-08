import { db } from "@/lib/db/index";
import {
  FacultySubjectId,
  NewFacultySubjectParams,
  UpdateFacultySubjectParams,
  updateFacultySubjectSchema,
  insertFacultySubjectSchema,
  facultySubjectIdSchema,
} from "@/lib/db/schema/facultySubject";
import { getUserAuth } from "@/lib/auth/utils";

export const createFacultySubject = async (
  facultySubject: NewFacultySubjectParams
) => {
  const { session } = await getUserAuth();
  const newFacultySubject = insertFacultySubjectSchema.parse({
    ...facultySubject,
    userId: session?.user.id,
  });
  try {
    const f = await db.facultySubject.create({ data: newFacultySubject });
    return { facultySubject: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFacultySubject = async (
  id: FacultySubjectId,
  facultySubject: UpdateFacultySubjectParams
) => {
  const { session } = await getUserAuth();
  const { id: facultySubjectId } = facultySubjectIdSchema.parse({ id });
  const newFacultySubject = updateFacultySubjectSchema.parse({
    ...facultySubject,
    userId: session?.user.id,
  });
  try {
    const f = await db.facultySubject.update({
      where: { id: facultySubjectId, userId: session?.user.id },
      data: newFacultySubject,
    });
    return { facultySubject: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFacultySubject = async (id: FacultySubjectId) => {
  const { session } = await getUserAuth();
  const { id: facultySubjectId } = facultySubjectIdSchema.parse({ id });
  try {
    const f = await db.facultySubject.delete({
      where: { id: facultySubjectId, userId: session?.user.id },
    });
    return { facultySubject: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
