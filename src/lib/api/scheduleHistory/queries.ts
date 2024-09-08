import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type ScheduleHistoryId, scheduleHistoryIdSchema } from "@/lib/db/schema/scheduleHistory";

export const getScheduleHistories = async () => {
  const { session } = await getUserAuth();
  const s = await db.scheduleHistory.findMany({ where: {userId: session?.user.id!}, include: { schedule: true, day: true, period: true, facultySubject: true}});
  return { scheduleHistory: s };
};

export const getScheduleHistoryById = async (id: ScheduleHistoryId) => {
  const { session } = await getUserAuth();
  const { id: scheduleHistoryId } = scheduleHistoryIdSchema.parse({ id });
  const s = await db.scheduleHistory.findFirst({
    where: { id: scheduleHistoryId, userId: session?.user.id!},
    include: { schedule: true, day: true, period: true, facultySubject: true }
  });
  return { scheduleHistory: s };
};


