import DayList from "@/components/day/DayList";
import NewDayModal from "@/components/day/DayModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Day() {
  await checkAuth();
  const { day } = await api.day.getDay.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Day</h1>
        <NewDayModal />
      </div>
      <DayList day={day} />
    </main>
  );
}
