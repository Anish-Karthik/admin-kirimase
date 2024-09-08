import ElectiveSubjectList from "@/components/electiveSubject/ElectiveSubjectList";
import NewElectiveSubjectModal from "@/components/electiveSubject/ElectiveSubjectModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ElectiveSubject() {
  await checkAuth();
  const { electiveSubject } = await api.electiveSubject.getElectiveSubject.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Elective Subject</h1>
        <NewElectiveSubjectModal />
      </div>
      <ElectiveSubjectList electiveSubject={electiveSubject} />
    </main>
  );
}
