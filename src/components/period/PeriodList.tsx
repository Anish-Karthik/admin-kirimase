"use client";
import { CompletePeriod } from "@/lib/db/schema/period";
import { trpc } from "@/lib/trpc/client";
import PeriodModal from "./PeriodModal";


export default function PeriodList({ period }: { period: CompletePeriod[] }) {
  const { data: p } = trpc.period.getPeriod.useQuery(undefined, {
    initialData: { period },
    refetchOnMount: false,
  });

  if (p.period.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.period.map((period) => (
        <Period period={period} key={period.id} />
      ))}
    </ul>
  );
}

const Period = ({ period }: { period: CompletePeriod }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{period.startTime.toString()}</div>
      </div>
      <PeriodModal period={period} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No period
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new period.
      </p>
      <div className="mt-6">
        <PeriodModal emptyState={true} />
      </div>
    </div>
  );
};

