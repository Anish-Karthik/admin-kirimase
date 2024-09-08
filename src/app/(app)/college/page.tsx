import CollegeList from "@/components/college/CollegeList";
import NewCollegeModal from "@/components/college/CollegeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function College() {
  await checkAuth();
  const { college } = await api.college.getCollege.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">College</h1>
        <NewCollegeModal />
      </div>
      <CollegeList college={college} />
    </main>
  );
}
