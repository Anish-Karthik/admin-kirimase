import { db } from "@/lib/db/index";
import { 
  DayId, 
  NewDayParams,
  UpdateDayParams, 
  updateDaySchema,
  insertDaySchema, 
  dayIdSchema 
} from "@/lib/db/schema/day";
import { getUserAuth } from "@/lib/auth/utils";

export const createDay = async (day: NewDayParams) => {
  const { session } = await getUserAuth();
  const newDay = insertDaySchema.parse({ ...day, userId: session?.user.id! });
  try {
    const d = await db.day.create({ data: newDay });
    return { day: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateDay = async (id: DayId, day: UpdateDayParams) => {
  const { session } = await getUserAuth();
  const { id: dayId } = dayIdSchema.parse({ id });
  const newDay = updateDaySchema.parse({ ...day, userId: session?.user.id! });
  try {
    const d = await db.day.update({ where: { id: dayId, userId: session?.user.id! }, data: newDay})
    return { day: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteDay = async (id: DayId) => {
  const { session } = await getUserAuth();
  const { id: dayId } = dayIdSchema.parse({ id });
  try {
    const d = await db.day.delete({ where: { id: dayId, userId: session?.user.id! }})
    return { day: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

