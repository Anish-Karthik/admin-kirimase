"use client";
import { CompleteAttendanceRecord } from "@/lib/db/schema/attendanceRecord";
import { trpc } from "@/lib/trpc/client";
import AttendanceRecordModal from "./AttendanceRecordModal";


export default function AttendanceRecordList({ attendanceRecord }: { attendanceRecord: CompleteAttendanceRecord[] }) {
  const { data: a } = trpc.attendanceRecord.getAttendanceRecord.useQuery(undefined, {
    initialData: { attendanceRecord },
    refetchOnMount: false,
  });

  if (a.attendanceRecord.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.attendanceRecord.map((attendanceRecord) => (
        <AttendanceRecord attendanceRecord={attendanceRecord} key={attendanceRecord.id} />
      ))}
    </ul>
  );
}

const AttendanceRecord = ({ attendanceRecord }: { attendanceRecord: CompleteAttendanceRecord }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{attendanceRecord.date.toString()}</div>
      </div>
      <AttendanceRecordModal attendanceRecord={attendanceRecord} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No attendance record
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new attendance record.
      </p>
      <div className="mt-6">
        <AttendanceRecordModal emptyState={true} />
      </div>
    </div>
  );
};

