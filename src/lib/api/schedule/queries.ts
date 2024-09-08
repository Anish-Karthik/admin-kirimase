import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type ScheduleId, scheduleIdSchema } from "@/lib/db/schema/schedule";

export const getSchedules = async () => {
  const { session } = await getUserAuth();
  const s = await db.schedule.findMany({ where: {userId: session?.user.id!}, include: { day: true, period: true, facultySubject: true, section: true}});
  return { schedule: s };
};

export const getScheduleById = async (id: ScheduleId) => {
  const { session } = await getUserAuth();
  const { id: scheduleId } = scheduleIdSchema.parse({ id });
  const s = await db.schedule.findFirst({
    where: { id: scheduleId, userId: session?.user.id!},
    include: { day: true, period: true, facultySubject: true, section: true }
  });
  return { schedule: s };
};


