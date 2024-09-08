import { getAttendanceRecordById, getAttendanceRecord } from "@/lib/api/attendanceRecord/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  attendanceRecordIdSchema,
  insertAttendanceRecordParams,
  updateAttendanceRecordParams,
} from "@/lib/db/schema/attendanceRecord";
import { createAttendanceRecord, deleteAttendanceRecord, updateAttendanceRecord } from "@/lib/api/attendanceRecord/mutations";

export const attendanceRecordRouter = router({
  getAttendanceRecord: publicProcedure.query(async () => {
    return getAttendanceRecord();
  }),
  getAttendanceRecordById: publicProcedure.input(attendanceRecordIdSchema).query(async ({ input }) => {
    return getAttendanceRecordById(input.id);
  }),
  createAttendanceRecord: publicProcedure
    .input(insertAttendanceRecordParams)
    .mutation(async ({ input }) => {
      return createAttendanceRecord(input);
    }),
  updateAttendanceRecord: publicProcedure
    .input(updateAttendanceRecordParams)
    .mutation(async ({ input }) => {
      return updateAttendanceRecord(input.id, input);
    }),
  deleteAttendanceRecord: publicProcedure
    .input(attendanceRecordIdSchema)
    .mutation(async ({ input }) => {
      return deleteAttendanceRecord(input.id);
    }),
});
