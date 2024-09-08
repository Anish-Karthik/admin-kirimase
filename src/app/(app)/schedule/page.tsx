import ScheduleList from "@/components/schedule/ScheduleList";
import NewScheduleModal from "@/components/schedule/ScheduleModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Schedule() {
  await checkAuth();
  const { schedule } = await api.schedule.getSchedule.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Schedule</h1>
        <NewScheduleModal />
      </div>
      <ScheduleList schedule={schedule} />
    </main>
  );
}
