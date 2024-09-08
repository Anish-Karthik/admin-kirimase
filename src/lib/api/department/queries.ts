import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import {
  type DepartmentId,
  departmentIdSchema,
} from "@/lib/db/schema/department";

export const getDepartments = async () => {
  const { session } = await getUserAuth();
  const d = await db.department.findMany({
    where: { userId: session?.user.id },
    include: { college: true },
  });
  return { departments: d };
};

export const getDepartmentById = async (id: DepartmentId) => {
  const { session } = await getUserAuth();
  const { id: departmentId } = departmentIdSchema.parse({ id });
  const d = await db.department.findFirst({
    where: { id: departmentId, userId: session?.user.id },
    include: { college: true },
  });
  return { department: d };
};
