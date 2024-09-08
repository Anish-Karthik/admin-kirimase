"use client";
import { CompleteFaculty } from "@/lib/db/schema/faculty";
import { trpc } from "@/lib/trpc/client";
import FacultyModal from "./FacultyModal";


export default function FacultyList({ faculty }: { faculty: CompleteFaculty[] }) {
  const { data: f } = trpc.faculty.getFaculty.useQuery(undefined, {
    initialData: { faculty },
    refetchOnMount: false,
  });

  if (f.faculty.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.faculty.map((faculty) => (
        <Faculty faculty={faculty} key={faculty.id} />
      ))}
    </ul>
  );
}

const Faculty = ({ faculty }: { faculty: CompleteFaculty }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{faculty.name}</div>
      </div>
      <FacultyModal faculty={faculty} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No faculty
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new faculty.
      </p>
      <div className="mt-6">
        <FacultyModal emptyState={true} />
      </div>
    </div>
  );
};

