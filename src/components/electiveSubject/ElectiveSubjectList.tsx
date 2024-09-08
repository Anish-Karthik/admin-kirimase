"use client";
import { CompleteElectiveSubject } from "@/lib/db/schema/electiveSubject";
import { trpc } from "@/lib/trpc/client";
import ElectiveSubjectModal from "./ElectiveSubjectModal";


export default function ElectiveSubjectList({ electiveSubject }: { electiveSubject: CompleteElectiveSubject[] }) {
  const { data: e } = trpc.electiveSubject.getElectiveSubject.useQuery(undefined, {
    initialData: { electiveSubject },
    refetchOnMount: false,
  });

  if (e.electiveSubject.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.electiveSubject.map((electiveSubject) => (
        <ElectiveSubject electiveSubject={electiveSubject} key={electiveSubject.id} />
      ))}
    </ul>
  );
}

const ElectiveSubject = ({ electiveSubject }: { electiveSubject: CompleteElectiveSubject }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{electiveSubject.courseEnrolledStudentId}</div>
      </div>
      <ElectiveSubjectModal electiveSubject={electiveSubject} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No elective subject
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new elective subject.
      </p>
      <div className="mt-6">
        <ElectiveSubjectModal emptyState={true} />
      </div>
    </div>
  );
};

