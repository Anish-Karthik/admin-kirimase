"use client";
import { CompleteSchedule } from "@/lib/db/schema/schedule";
import { trpc } from "@/lib/trpc/client";
import ScheduleModal from "./ScheduleModal";


export default function ScheduleList({ schedule }: { schedule: CompleteSchedule[] }) {
  const { data: s } = trpc.schedule.getSchedule.useQuery(undefined, {
    initialData: { schedule },
    refetchOnMount: false,
  });

  if (s.schedule.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.schedule.map((schedule) => (
        <Schedule schedule={schedule} key={schedule.id} />
      ))}
    </ul>
  );
}

const Schedule = ({ schedule }: { schedule: CompleteSchedule }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{schedule.dayId}</div>
      </div>
      <ScheduleModal schedule={schedule} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No schedule
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new schedule.
      </p>
      <div className="mt-6">
        <ScheduleModal emptyState={true} />
      </div>
    </div>
  );
};

