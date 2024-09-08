import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type FacultyId, facultyIdSchema } from "@/lib/db/schema/faculty";

export const getFaculties = async () => {
  const { session } = await getUserAuth();
  const f = await db.faculty.findMany({ where: {userId: session?.user.id!}, include: { department: true}});
  return { faculty: f };
};

export const getFacultyById = async (id: FacultyId) => {
  const { session } = await getUserAuth();
  const { id: facultyId } = facultyIdSchema.parse({ id });
  const f = await db.faculty.findFirst({
    where: { id: facultyId, userId: session?.user.id!},
    include: { department: true }
  });
  return { faculty: f };
};


