import { getSectionById, getSection } from "@/lib/api/section/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  sectionIdSchema,
  insertSectionParams,
  updateSectionParams,
} from "@/lib/db/schema/section";
import { createSection, deleteSection, updateSection } from "@/lib/api/section/mutations";

export const sectionRouter = router({
  getSection: publicProcedure.query(async () => {
    return getSection();
  }),
  getSectionById: publicProcedure.input(sectionIdSchema).query(async ({ input }) => {
    return getSectionById(input.id);
  }),
  createSection: publicProcedure
    .input(insertSectionParams)
    .mutation(async ({ input }) => {
      return createSection(input);
    }),
  updateSection: publicProcedure
    .input(updateSectionParams)
    .mutation(async ({ input }) => {
      return updateSection(input.id, input);
    }),
  deleteSection: publicProcedure
    .input(sectionIdSchema)
    .mutation(async ({ input }) => {
      return deleteSection(input.id);
    }),
});
