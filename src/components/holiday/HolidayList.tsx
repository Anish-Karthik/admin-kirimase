"use client";
import { CompleteHoliday } from "@/lib/db/schema/holiday";
import { trpc } from "@/lib/trpc/client";
import HolidayModal from "./HolidayModal";


export default function HolidayList({ holiday }: { holiday: CompleteHoliday[] }) {
  const { data: h } = trpc.holiday.getHoliday.useQuery(undefined, {
    initialData: { holiday },
    refetchOnMount: false,
  });

  if (h.holiday.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {h.holiday.map((holiday) => (
        <Holiday holiday={holiday} key={holiday.id} />
      ))}
    </ul>
  );
}

const Holiday = ({ holiday }: { holiday: CompleteHoliday }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{holiday.name}</div>
      </div>
      <HolidayModal holiday={holiday} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No holiday
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new holiday.
      </p>
      <div className="mt-6">
        <HolidayModal emptyState={true} />
      </div>
    </div>
  );
};

