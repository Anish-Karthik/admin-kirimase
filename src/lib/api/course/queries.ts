import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type CourseId, courseIdSchema } from "@/lib/db/schema/course";

export const getCourses = async () => {
  const { session } = await getUserAuth();
  const c = await db.course.findMany({ where: {userId: session?.user.id!}, include: { department: true}});
  return { course: c };
};

export const getCourseById = async (id: CourseId) => {
  const { session } = await getUserAuth();
  const { id: courseId } = courseIdSchema.parse({ id });
  const c = await db.course.findFirst({
    where: { id: courseId, userId: session?.user.id!},
    include: { department: true }
  });
  return { course: c };
};


