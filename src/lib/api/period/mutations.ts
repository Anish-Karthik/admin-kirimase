import { db } from "@/lib/db/index";
import {
  PeriodId,
  NewPeriodParams,
  UpdatePeriodParams,
  updatePeriodSchema,
  insertPeriodSchema,
  periodIdSchema,
} from "@/lib/db/schema/period";
import { getUserAuth } from "@/lib/auth/utils";

export const createPeriod = async (period: NewPeriodParams) => {
  const { session } = await getUserAuth();
  const newPeriod = insertPeriodSchema.parse({
    ...period,
    userId: session?.user.id,
  });
  try {
    const p = await db.period.create({ data: newPeriod });
    return { period: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePeriod = async (
  id: PeriodId,
  period: UpdatePeriodParams
) => {
  const { session } = await getUserAuth();
  const { id: periodId } = periodIdSchema.parse({ id });
  const newPeriod = updatePeriodSchema.parse({
    ...period,
    userId: session?.user.id,
  });
  try {
    const p = await db.period.update({
      where: { id: periodId, userId: session?.user.id },
      data: newPeriod,
    });
    return { period: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePeriod = async (id: PeriodId) => {
  const { session } = await getUserAuth();
  const { id: periodId } = periodIdSchema.parse({ id });
  try {
    const p = await db.period.delete({
      where: { id: periodId, userId: session?.user.id },
    });
    return { period: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
