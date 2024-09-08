"use client";
import { CompleteDay } from "@/lib/db/schema/day";
import { trpc } from "@/lib/trpc/client";
import DayModal from "./DayModal";


export default function DayList({ day }: { day: CompleteDay[] }) {
  const { data: d } = trpc.day.getDay.useQuery(undefined, {
    initialData: { day },
    refetchOnMount: false,
  });

  if (d.day.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {d.day.map((day) => (
        <Day day={day} key={day.id} />
      ))}
    </ul>
  );
}

const Day = ({ day }: { day: CompleteDay }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{day.name}</div>
      </div>
      <DayModal day={day} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No day
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new day.
      </p>
      <div className="mt-6">
        <DayModal emptyState={true} />
      </div>
    </div>
  );
};

