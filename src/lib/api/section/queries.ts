import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type SectionId, sectionIdSchema } from "@/lib/db/schema/section";

export const getSection = async () => {
  const { session } = await getUserAuth();
  const s = await db.section.findMany({
    where: { userId: session?.user.id },
    include: { course: true },
  });
  return { section: s };
};

export const getSectionById = async (id: SectionId) => {
  const { session } = await getUserAuth();
  const { id: sectionId } = sectionIdSchema.parse({ id });
  const s = await db.section.findFirst({
    where: { id: sectionId, userId: session?.user.id },
    include: { course: true },
  });
  return { section: s };
};
