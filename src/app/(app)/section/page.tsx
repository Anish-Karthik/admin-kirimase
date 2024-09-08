import SectionList from "@/components/section/SectionList";
import NewSectionModal from "@/components/section/SectionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Section() {
  await checkAuth();
  const { section } = await api.section.getSection.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Section</h1>
        <NewSectionModal />
      </div>
      <SectionList section={section} />
    </main>
  );
}
