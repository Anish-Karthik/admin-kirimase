"use client";
import { CompleteScheduleHistory } from "@/lib/db/schema/scheduleHistory";
import { trpc } from "@/lib/trpc/client";
import ScheduleHistoryModal from "./ScheduleHistoryModal";


export default function ScheduleHistoryList({ scheduleHistory }: { scheduleHistory: CompleteScheduleHistory[] }) {
  const { data: s } = trpc.scheduleHistory.getScheduleHistory.useQuery(undefined, {
    initialData: { scheduleHistory },
    refetchOnMount: false,
  });

  if (s.scheduleHistory.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scheduleHistory.map((scheduleHistory) => (
        <ScheduleHistory scheduleHistory={scheduleHistory} key={scheduleHistory.id} />
      ))}
    </ul>
  );
}

const ScheduleHistory = ({ scheduleHistory }: { scheduleHistory: CompleteScheduleHistory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scheduleHistory.scheduleId}</div>
      </div>
      <ScheduleHistoryModal scheduleHistory={scheduleHistory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No schedule history
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new schedule history.
      </p>
      <div className="mt-6">
        <ScheduleHistoryModal emptyState={true} />
      </div>
    </div>
  );
};

