import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type DayId, dayIdSchema } from "@/lib/db/schema/day";

export const getDays = async () => {
  const { session } = await getUserAuth();
  const d = await db.day.findMany({ where: {userId: session?.user.id!}});
  return { day: d };
};

export const getDayById = async (id: DayId) => {
  const { session } = await getUserAuth();
  const { id: dayId } = dayIdSchema.parse({ id });
  const d = await db.day.findFirst({
    where: { id: dayId, userId: session?.user.id!}});
  return { day: d };
};


