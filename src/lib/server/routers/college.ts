import { getCollegeById, getColleges } from "@/lib/api/college/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  collegeIdSchema,
  insertCollegeParams,
  updateCollegeParams,
} from "@/lib/db/schema/college";
import { createCollege, deleteCollege, updateCollege } from "@/lib/api/college/mutations";

export const collegeRouter = router({
  getColleges: publicProcedure.query(async () => {
    return getColleges();
  }),
  getCollegeById: publicProcedure.input(collegeIdSchema).query(async ({ input }) => {
    return getCollegeById(input.id);
  }),
  createCollege: publicProcedure
    .input(insertCollegeParams)
    .mutation(async ({ input }) => {
      return createCollege(input);
    }),
  updateCollege: publicProcedure
    .input(updateCollegeParams)
    .mutation(async ({ input }) => {
      return updateCollege(input.id, input);
    }),
  deleteCollege: publicProcedure
    .input(collegeIdSchema)
    .mutation(async ({ input }) => {
      return deleteCollege(input.id);
    }),
});
