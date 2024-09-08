import { db } from "@/lib/db/index";
import {
  AttendanceRecordId,
  NewAttendanceRecordParams,
  UpdateAttendanceRecordParams,
  updateAttendanceRecordSchema,
  insertAttendanceRecordSchema,
  attendanceRecordIdSchema,
} from "@/lib/db/schema/attendanceRecord";
import { getUserAuth } from "@/lib/auth/utils";

export const createAttendanceRecord = async (
  attendanceRecord: NewAttendanceRecordParams
) => {
  const { session } = await getUserAuth();
  const newAttendanceRecord = insertAttendanceRecordSchema.parse({
    ...attendanceRecord,
    userId: session?.user.id,
  });
  try {
    const a = await db.attendanceRecord.create({ data: newAttendanceRecord });
    return { attendanceRecord: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAttendanceRecord = async (
  id: AttendanceRecordId,
  attendanceRecord: UpdateAttendanceRecordParams
) => {
  const { session } = await getUserAuth();
  const { id: attendanceRecordId } = attendanceRecordIdSchema.parse({ id });
  const newAttendanceRecord = updateAttendanceRecordSchema.parse({
    ...attendanceRecord,
    userId: session?.user.id,
  });
  try {
    const a = await db.attendanceRecord.update({
      where: { id: attendanceRecordId, userId: session?.user.id },
      data: newAttendanceRecord,
    });
    return { attendanceRecord: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAttendanceRecord = async (id: AttendanceRecordId) => {
  const { session } = await getUserAuth();
  const { id: attendanceRecordId } = attendanceRecordIdSchema.parse({ id });
  try {
    const a = await db.attendanceRecord.delete({
      where: { id: attendanceRecordId, userId: session?.user.id },
    });
    return { attendanceRecord: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
