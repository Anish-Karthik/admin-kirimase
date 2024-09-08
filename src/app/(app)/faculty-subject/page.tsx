import FacultySubjectList from "@/components/facultySubject/FacultySubjectList";
import NewFacultySubjectModal from "@/components/facultySubject/FacultySubjectModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function FacultySubject() {
  await checkAuth();
  const { facultySubject } = await api.facultySubject.getFacultySubject.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Faculty Subject</h1>
        <NewFacultySubjectModal />
      </div>
      <FacultySubjectList facultySubject={facultySubject} />
    </main>
  );
}
