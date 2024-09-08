import { db } from "@/lib/db/index";
import {
  CourseEnrolledStudentId,
  NewCourseEnrolledStudentParams,
  UpdateCourseEnrolledStudentParams,
  updateCourseEnrolledStudentSchema,
  insertCourseEnrolledStudentSchema,
  courseEnrolledStudentIdSchema,
} from "@/lib/db/schema/courseEnrolledStudent";
import { getUserAuth } from "@/lib/auth/utils";

export const createCourseEnrolledStudent = async (
  courseEnrolledStudent: NewCourseEnrolledStudentParams
) => {
  const { session } = await getUserAuth();
  const newCourseEnrolledStudent = insertCourseEnrolledStudentSchema.parse({
    ...courseEnrolledStudent,
    userId: session?.user.id,
  });
  try {
    const c = await db.courseEnrolledStudent.create({
      data: newCourseEnrolledStudent,
    });
    return { courseEnrolledStudent: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseEnrolledStudent = async (
  id: CourseEnrolledStudentId,
  courseEnrolledStudent: UpdateCourseEnrolledStudentParams
) => {
  const { session } = await getUserAuth();
  const { id: courseEnrolledStudentId } = courseEnrolledStudentIdSchema.parse({
    id,
  });
  const newCourseEnrolledStudent = updateCourseEnrolledStudentSchema.parse({
    ...courseEnrolledStudent,
    userId: session?.user.id,
  });
  try {
    const c = await db.courseEnrolledStudent.update({
      where: { id: courseEnrolledStudentId, userId: session?.user.id },
      data: newCourseEnrolledStudent,
    });
    return { courseEnrolledStudent: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseEnrolledStudent = async (
  id: CourseEnrolledStudentId
) => {
  const { session } = await getUserAuth();
  const { id: courseEnrolledStudentId } = courseEnrolledStudentIdSchema.parse({
    id,
  });
  try {
    const c = await db.courseEnrolledStudent.delete({
      where: { id: courseEnrolledStudentId, userId: session?.user.id },
    });
    return { courseEnrolledStudent: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
