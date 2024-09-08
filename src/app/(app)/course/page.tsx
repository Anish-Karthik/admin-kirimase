import CourseList from "@/components/course/CourseList";
import NewCourseModal from "@/components/course/CourseModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Course() {
  await checkAuth();
  const { course } = await api.course.getCourse.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course</h1>
        <NewCourseModal />
      </div>
      <CourseList course={course} />
    </main>
  );
}
