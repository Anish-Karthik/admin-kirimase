import { db } from "@/lib/db/index";
import {
  SectionId,
  NewSectionParams,
  UpdateSectionParams,
  updateSectionSchema,
  insertSectionSchema,
  sectionIdSchema,
} from "@/lib/db/schema/section";
import { getUserAuth } from "@/lib/auth/utils";

export const createSection = async (section: NewSectionParams) => {
  const { session } = await getUserAuth();
  const newSection = insertSectionSchema.parse({
    ...section,
    userId: session?.user.id,
  });
  try {
    const s = await db.section.create({ data: newSection });
    return { section: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSection = async (
  id: SectionId,
  section: UpdateSectionParams
) => {
  const { session } = await getUserAuth();
  const { id: sectionId } = sectionIdSchema.parse({ id });
  const newSection = updateSectionSchema.parse({
    ...section,
    userId: session?.user.id,
  });
  try {
    const s = await db.section.update({
      where: { id: sectionId, userId: session?.user.id },
      data: newSection,
    });
    return { section: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSection = async (id: SectionId) => {
  const { session } = await getUserAuth();
  const { id: sectionId } = sectionIdSchema.parse({ id });
  try {
    const s = await db.section.delete({
      where: { id: sectionId, userId: session?.user.id },
    });
    return { section: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
