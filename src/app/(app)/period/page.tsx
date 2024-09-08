import PeriodList from "@/components/period/PeriodList";
import NewPeriodModal from "@/components/period/PeriodModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Period() {
  await checkAuth();
  const { period } = await api.period.getPeriod.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Period</h1>
        <NewPeriodModal />
      </div>
      <PeriodList period={period} />
    </main>
  );
}
