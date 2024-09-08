import SubjectList from "@/components/subject/SubjectList";
import NewSubjectModal from "@/components/subject/SubjectModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Subject() {
  await checkAuth();
  const { subject } = await api.subject.getSubject.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Subject</h1>
        <NewSubjectModal />
      </div>
      <SubjectList subject={subject} />
    </main>
  );
}
