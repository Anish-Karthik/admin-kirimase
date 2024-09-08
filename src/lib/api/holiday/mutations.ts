import { db } from "@/lib/db/index";
import { 
  HolidayId, 
  NewHolidayParams,
  UpdateHolidayParams, 
  updateHolidaySchema,
  insertHolidaySchema, 
  holidayIdSchema 
} from "@/lib/db/schema/holiday";
import { getUserAuth } from "@/lib/auth/utils";

export const createHoliday = async (holiday: NewHolidayParams) => {
  const { session } = await getUserAuth();
  const newHoliday = insertHolidaySchema.parse({ ...holiday, userId: session?.user.id! });
  try {
    const h = await db.holiday.create({ data: newHoliday });
    return { holiday: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateHoliday = async (id: HolidayId, holiday: UpdateHolidayParams) => {
  const { session } = await getUserAuth();
  const { id: holidayId } = holidayIdSchema.parse({ id });
  const newHoliday = updateHolidaySchema.parse({ ...holiday, userId: session?.user.id! });
  try {
    const h = await db.holiday.update({ where: { id: holidayId, userId: session?.user.id! }, data: newHoliday})
    return { holiday: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteHoliday = async (id: HolidayId) => {
  const { session } = await getUserAuth();
  const { id: holidayId } = holidayIdSchema.parse({ id });
  try {
    const h = await db.holiday.delete({ where: { id: holidayId, userId: session?.user.id! }})
    return { holiday: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

