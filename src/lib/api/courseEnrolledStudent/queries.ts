import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type CourseEnrolledStudentId, courseEnrolledStudentIdSchema } from "@/lib/db/schema/courseEnrolledStudent";

export const getCourseEnrolledStudents = async () => {
  const { session } = await getUserAuth();
  const c = await db.courseEnrolledStudent.findMany({ where: {userId: session?.user.id!}, include: { course: true, student: true}});
  return { courseEnrolledStudent: c };
};

export const getCourseEnrolledStudentById = async (id: CourseEnrolledStudentId) => {
  const { session } = await getUserAuth();
  const { id: courseEnrolledStudentId } = courseEnrolledStudentIdSchema.parse({ id });
  const c = await db.courseEnrolledStudent.findFirst({
    where: { id: courseEnrolledStudentId, userId: session?.user.id!},
    include: { course: true, student: true }
  });
  return { courseEnrolledStudent: c };
};


