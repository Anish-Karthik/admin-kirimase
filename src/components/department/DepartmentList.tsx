"use client";
import { CompleteDepartment } from "@/lib/db/schema/department";
import { trpc } from "@/lib/trpc/client";
import DepartmentModal from "./DepartmentModal";


export default function DepartmentList({ departments }: { departments: CompleteDepartment[] }) {
  const { data: d } = trpc.department.getDepartments.useQuery(undefined, {
    initialData: { departments },
    refetchOnMount: false,
  });

  if (d.departments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {d.departments.map((department) => (
        <Department department={department} key={department.id} />
      ))}
    </ul>
  );
}

const Department = ({ department }: { department: CompleteDepartment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{department.name}</div>
      </div>
      <DepartmentModal department={department} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No department
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new department.
      </p>
      <div className="mt-6">
        <DepartmentModal emptyState={true} />
      </div>
    </div>
  );
};

