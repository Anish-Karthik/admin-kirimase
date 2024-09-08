"use client";
import { CompleteCollege } from "@/lib/db/schema/college";
import { trpc } from "@/lib/trpc/client";
import CollegeModal from "./CollegeModal";

export default function CollegeList({
  colleges,
}: {
  colleges: CompleteCollege[];
}) {
  const { data: c } = trpc.college.getColleges.useQuery(undefined, {
    initialData: { colleges },
    refetchOnMount: false,
  });

  if (c.colleges.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.colleges.map((college) => (
        <College college={college} key={college.id} />
      ))}
    </ul>
  );
}

const College = ({ college }: { college: CompleteCollege }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{college.name}</div>
      </div>
      <CollegeModal college={college} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No college
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new college.
      </p>
      <div className="mt-6">
        <CollegeModal emptyState={true} />
      </div>
    </div>
  );
};
