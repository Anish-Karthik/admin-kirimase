import CourseEnrolledStudentList from "@/components/courseEnrolledStudent/CourseEnrolledStudentList";
import NewCourseEnrolledStudentModal from "@/components/courseEnrolledStudent/CourseEnrolledStudentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CourseEnrolledStudent() {
  await checkAuth();
  const { courseEnrolledStudent } = await api.courseEnrolledStudent.getCourseEnrolledStudent.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Enrolled Student</h1>
        <NewCourseEnrolledStudentModal />
      </div>
      <CourseEnrolledStudentList courseEnrolledStudent={courseEnrolledStudent} />
    </main>
  );
}
