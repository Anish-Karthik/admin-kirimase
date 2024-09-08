import { db } from "@/lib/db/index";
import { 
  ScheduleId, 
  NewScheduleParams,
  UpdateScheduleParams, 
  updateScheduleSchema,
  insertScheduleSchema, 
  scheduleIdSchema 
} from "@/lib/db/schema/schedule";
import { getUserAuth } from "@/lib/auth/utils";

export const createSchedule = async (schedule: NewScheduleParams) => {
  const { session } = await getUserAuth();
  const newSchedule = insertScheduleSchema.parse({ ...schedule, userId: session?.user.id! });
  try {
    const s = await db.schedule.create({ data: newSchedule });
    return { schedule: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSchedule = async (id: ScheduleId, schedule: UpdateScheduleParams) => {
  const { session } = await getUserAuth();
  const { id: scheduleId } = scheduleIdSchema.parse({ id });
  const newSchedule = updateScheduleSchema.parse({ ...schedule, userId: session?.user.id! });
  try {
    const s = await db.schedule.update({ where: { id: scheduleId, userId: session?.user.id! }, data: newSchedule})
    return { schedule: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSchedule = async (id: ScheduleId) => {
  const { session } = await getUserAuth();
  const { id: scheduleId } = scheduleIdSchema.parse({ id });
  try {
    const s = await db.schedule.delete({ where: { id: scheduleId, userId: session?.user.id! }})
    return { schedule: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

