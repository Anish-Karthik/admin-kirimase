import { db } from "@/lib/db/index";
import { 
  SubjectId, 
  NewSubjectParams,
  UpdateSubjectParams, 
  updateSubjectSchema,
  insertSubjectSchema, 
  subjectIdSchema 
} from "@/lib/db/schema/subject";
import { getUserAuth } from "@/lib/auth/utils";

export const createSubject = async (subject: NewSubjectParams) => {
  const { session } = await getUserAuth();
  const newSubject = insertSubjectSchema.parse({ ...subject, userId: session?.user.id! });
  try {
    const s = await db.subject.create({ data: newSubject });
    return { subject: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSubject = async (id: SubjectId, subject: UpdateSubjectParams) => {
  const { session } = await getUserAuth();
  const { id: subjectId } = subjectIdSchema.parse({ id });
  const newSubject = updateSubjectSchema.parse({ ...subject, userId: session?.user.id! });
  try {
    const s = await db.subject.update({ where: { id: subjectId, userId: session?.user.id! }, data: newSubject})
    return { subject: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSubject = async (id: SubjectId) => {
  const { session } = await getUserAuth();
  const { id: subjectId } = subjectIdSchema.parse({ id });
  try {
    const s = await db.subject.delete({ where: { id: subjectId, userId: session?.user.id! }})
    return { subject: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

