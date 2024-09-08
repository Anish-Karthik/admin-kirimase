"use client";
import { CompleteCourseEnrolledStudent } from "@/lib/db/schema/courseEnrolledStudent";
import { trpc } from "@/lib/trpc/client";
import CourseEnrolledStudentModal from "./CourseEnrolledStudentModal";


export default function CourseEnrolledStudentList({ courseEnrolledStudent }: { courseEnrolledStudent: CompleteCourseEnrolledStudent[] }) {
  const { data: c } = trpc.courseEnrolledStudent.getCourseEnrolledStudent.useQuery(undefined, {
    initialData: { courseEnrolledStudent },
    refetchOnMount: false,
  });

  if (c.courseEnrolledStudent.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseEnrolledStudent.map((courseEnrolledStudent) => (
        <CourseEnrolledStudent courseEnrolledStudent={courseEnrolledStudent} key={courseEnrolledStudent.id} />
      ))}
    </ul>
  );
}

const CourseEnrolledStudent = ({ courseEnrolledStudent }: { courseEnrolledStudent: CompleteCourseEnrolledStudent }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseEnrolledStudent.batchYear}</div>
      </div>
      <CourseEnrolledStudentModal courseEnrolledStudent={courseEnrolledStudent} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course enrolled student
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course enrolled student.
      </p>
      <div className="mt-6">
        <CourseEnrolledStudentModal emptyState={true} />
      </div>
    </div>
  );
};

