import FacultyList from "@/components/faculty/FacultyList";
import NewFacultyModal from "@/components/faculty/FacultyModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Faculty() {
  await checkAuth();
  const { faculty } = await api.faculty.getFaculty.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Faculty</h1>
        <NewFacultyModal />
      </div>
      <FacultyList faculty={faculty} />
    </main>
  );
}
