import { db } from "@/lib/db/index";
import {
  CourseId,
  NewCourseParams,
  UpdateCourseParams,
  updateCourseSchema,
  insertCourseSchema,
  courseIdSchema,
} from "@/lib/db/schema/course";
import { getUserAuth } from "@/lib/auth/utils";

export const createCourse = async (course: NewCourseParams) => {
  const { session } = await getUserAuth();
  const newCourse = insertCourseSchema.parse({
    ...course,
    userId: session?.user.id,
  });
  try {
    const c = await db.course.create({ data: newCourse });
    return { course: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourse = async (
  id: CourseId,
  course: UpdateCourseParams
) => {
  const { session } = await getUserAuth();
  const { id: courseId } = courseIdSchema.parse({ id });
  const newCourse = updateCourseSchema.parse({
    ...course,
    userId: session?.user.id,
  });
  try {
    const c = await db.course.update({
      where: { id: courseId, userId: session?.user.id },
      data: newCourse,
    });
    return { course: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourse = async (id: CourseId) => {
  const { session } = await getUserAuth();
  const { id: courseId } = courseIdSchema.parse({ id });
  try {
    const c = await db.course.delete({
      where: { id: courseId, userId: session?.user.id },
    });
    return { course: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
