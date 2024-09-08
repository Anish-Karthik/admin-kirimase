import HolidayList from "@/components/holiday/HolidayList";
import NewHolidayModal from "@/components/holiday/HolidayModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Holiday() {
  await checkAuth();
  const { holiday } = await api.holiday.getHoliday.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Holiday</h1>
        <NewHolidayModal />
      </div>
      <HolidayList holiday={holiday} />
    </main>
  );
}
