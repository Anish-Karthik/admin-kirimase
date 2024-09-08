import DepartmentList from "@/components/department/DepartmentList";
import NewDepartmentModal from "@/components/department/DepartmentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Department() {
  await checkAuth();
  const { departments } = await api.department.getDepartments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Department</h1>
        <NewDepartmentModal />
      </div>
      <DepartmentList departments={departments} />
    </main>
  );
}
