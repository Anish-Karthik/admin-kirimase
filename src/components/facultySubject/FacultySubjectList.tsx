"use client";
import { CompleteFacultySubject } from "@/lib/db/schema/facultySubject";
import { trpc } from "@/lib/trpc/client";
import FacultySubjectModal from "./FacultySubjectModal";


export default function FacultySubjectList({ facultySubject }: { facultySubject: CompleteFacultySubject[] }) {
  const { data: f } = trpc.facultySubject.getFacultySubject.useQuery(undefined, {
    initialData: { facultySubject },
    refetchOnMount: false,
  });

  if (f.facultySubject.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.facultySubject.map((facultySubject) => (
        <FacultySubject facultySubject={facultySubject} key={facultySubject.id} />
      ))}
    </ul>
  );
}

const FacultySubject = ({ facultySubject }: { facultySubject: CompleteFacultySubject }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{facultySubject.subjectId}</div>
      </div>
      <FacultySubjectModal facultySubject={facultySubject} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No faculty subject
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new faculty subject.
      </p>
      <div className="mt-6">
        <FacultySubjectModal emptyState={true} />
      </div>
    </div>
  );
};

