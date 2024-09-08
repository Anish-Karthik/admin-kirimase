import AttendanceRecordList from "@/components/attendanceRecord/AttendanceRecordList";
import NewAttendanceRecordModal from "@/components/attendanceRecord/AttendanceRecordModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function AttendanceRecord() {
  await checkAuth();
  const { attendanceRecord } = await api.attendanceRecord.getAttendanceRecord.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Attendance Record</h1>
        <NewAttendanceRecordModal />
      </div>
      <AttendanceRecordList attendanceRecord={attendanceRecord} />
    </main>
  );
}
