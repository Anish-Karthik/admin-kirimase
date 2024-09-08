import StudentList from "@/components/student/StudentList";
import NewStudentModal from "@/components/student/StudentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Student() {
  await checkAuth();
  const { student } = await api.student.getStudent.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Student</h1>
        <NewStudentModal />
      </div>
      <StudentList student={student} />
    </main>
  );
}
