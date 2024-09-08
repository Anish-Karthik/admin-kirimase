import { db } from "@/lib/db/index";
import { 
  ScheduleHistoryId, 
  NewScheduleHistoryParams,
  UpdateScheduleHistoryParams, 
  updateScheduleHistorySchema,
  insertScheduleHistorySchema, 
  scheduleHistoryIdSchema 
} from "@/lib/db/schema/scheduleHistory";
import { getUserAuth } from "@/lib/auth/utils";

export const createScheduleHistory = async (scheduleHistory: NewScheduleHistoryParams) => {
  const { session } = await getUserAuth();
  const newScheduleHistory = insertScheduleHistorySchema.parse({ ...scheduleHistory, userId: session?.user.id! });
  try {
    const s = await db.scheduleHistory.create({ data: newScheduleHistory });
    return { scheduleHistory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScheduleHistory = async (id: ScheduleHistoryId, scheduleHistory: UpdateScheduleHistoryParams) => {
  const { session } = await getUserAuth();
  const { id: scheduleHistoryId } = scheduleHistoryIdSchema.parse({ id });
  const newScheduleHistory = updateScheduleHistorySchema.parse({ ...scheduleHistory, userId: session?.user.id! });
  try {
    const s = await db.scheduleHistory.update({ where: { id: scheduleHistoryId, userId: session?.user.id! }, data: newScheduleHistory})
    return { scheduleHistory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScheduleHistory = async (id: ScheduleHistoryId) => {
  const { session } = await getUserAuth();
  const { id: scheduleHistoryId } = scheduleHistoryIdSchema.parse({ id });
  try {
    const s = await db.scheduleHistory.delete({ where: { id: scheduleHistoryId, userId: session?.user.id! }})
    return { scheduleHistory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

