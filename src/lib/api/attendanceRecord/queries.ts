import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type AttendanceRecordId, attendanceRecordIdSchema } from "@/lib/db/schema/attendanceRecord";

export const getAttendanceRecords = async () => {
  const { session } = await getUserAuth();
  const a = await db.attendanceRecord.findMany({ where: {userId: session?.user.id!}, include: { enrollment: true, schedule: true, faculty: true, scheduleHistory: true}});
  return { attendanceRecord: a };
};

export const getAttendanceRecordById = async (id: AttendanceRecordId) => {
  const { session } = await getUserAuth();
  const { id: attendanceRecordId } = attendanceRecordIdSchema.parse({ id });
  const a = await db.attendanceRecord.findFirst({
    where: { id: attendanceRecordId, userId: session?.user.id!},
    include: { enrollment: true, schedule: true, faculty: true, scheduleHistory: true }
  });
  return { attendanceRecord: a };
};


