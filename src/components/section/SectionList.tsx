"use client";
import { CompleteSection } from "@/lib/db/schema/section";
import { trpc } from "@/lib/trpc/client";
import SectionModal from "./SectionModal";


export default function SectionList({ section }: { section: CompleteSection[] }) {
  const { data: s } = trpc.section.getSection.useQuery(undefined, {
    initialData: { section },
    refetchOnMount: false,
  });

  if (s.section.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.section.map((section) => (
        <Section section={section} key={section.id} />
      ))}
    </ul>
  );
}

const Section = ({ section }: { section: CompleteSection }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{section.name}</div>
      </div>
      <SectionModal section={section} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No section
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new section.
      </p>
      <div className="mt-6">
        <SectionModal emptyState={true} />
      </div>
    </div>
  );
};

