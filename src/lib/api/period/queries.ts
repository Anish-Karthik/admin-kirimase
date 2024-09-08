import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type PeriodId, periodIdSchema } from "@/lib/db/schema/period";

export const getPeriods = async () => {
  const { session } = await getUserAuth();
  const p = await db.period.findMany({ where: {userId: session?.user.id!}, include: { course: true}});
  return { period: p };
};

export const getPeriodById = async (id: PeriodId) => {
  const { session } = await getUserAuth();
  const { id: periodId } = periodIdSchema.parse({ id });
  const p = await db.period.findFirst({
    where: { id: periodId, userId: session?.user.id!},
    include: { course: true }
  });
  return { period: p };
};


