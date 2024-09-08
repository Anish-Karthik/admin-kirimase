import ScheduleHistoryList from "@/components/scheduleHistory/ScheduleHistoryList";
import NewScheduleHistoryModal from "@/components/scheduleHistory/ScheduleHistoryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ScheduleHistory() {
  await checkAuth();
  const { scheduleHistory } = await api.scheduleHistory.getScheduleHistory.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Schedule History</h1>
        <NewScheduleHistoryModal />
      </div>
      <ScheduleHistoryList scheduleHistory={scheduleHistory} />
    </main>
  );
}
