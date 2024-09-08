import EnrollmentList from "@/components/enrollment/EnrollmentList";
import NewEnrollmentModal from "@/components/enrollment/EnrollmentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Enrollment() {
  await checkAuth();
  const { enrollment } = await api.enrollment.getEnrollment.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrollment</h1>
        <NewEnrollmentModal />
      </div>
      <EnrollmentList enrollment={enrollment} />
    </main>
  );
}
