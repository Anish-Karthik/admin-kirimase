"use client";
import { CompleteEnrollment } from "@/lib/db/schema/enrollment";
import { trpc } from "@/lib/trpc/client";
import EnrollmentModal from "./EnrollmentModal";


export default function EnrollmentList({ enrollment }: { enrollment: CompleteEnrollment[] }) {
  const { data: e } = trpc.enrollment.getEnrollment.useQuery(undefined, {
    initialData: { enrollment },
    refetchOnMount: false,
  });

  if (e.enrollment.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrollment.map((enrollment) => (
        <Enrollment enrollment={enrollment} key={enrollment.id} />
      ))}
    </ul>
  );
}

const Enrollment = ({ enrollment }: { enrollment: CompleteEnrollment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrollment.rollNumber}</div>
      </div>
      <EnrollmentModal enrollment={enrollment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrollment
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrollment.
      </p>
      <div className="mt-6">
        <EnrollmentModal emptyState={true} />
      </div>
    </div>
  );
};

