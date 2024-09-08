import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type HolidayId, holidayIdSchema } from "@/lib/db/schema/holiday";

export const getHoliday = async () => {
  const { session } = await getUserAuth();
  const h = await db.holiday.findMany({
    where: { userId: session?.user.id },
    include: { college: true },
  });
  return { holiday: h };
};

export const getHolidayById = async (id: HolidayId) => {
  const { session } = await getUserAuth();
  const { id: holidayId } = holidayIdSchema.parse({ id });
  const h = await db.holiday.findFirst({
    where: { id: holidayId, userId: session?.user.id },
    include: { college: true },
  });
  return { holiday: h };
};
