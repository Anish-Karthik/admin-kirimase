import { db } from "@/lib/db/index";
import { 
  DepartmentId, 
  NewDepartmentParams,
  UpdateDepartmentParams, 
  updateDepartmentSchema,
  insertDepartmentSchema, 
  departmentIdSchema 
} from "@/lib/db/schema/department";
import { getUserAuth } from "@/lib/auth/utils";

export const createDepartment = async (department: NewDepartmentParams) => {
  const { session } = await getUserAuth();
  const newDepartment = insertDepartmentSchema.parse({ ...department, userId: session?.user.id! });
  try {
    const d = await db.department.create({ data: newDepartment });
    return { department: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateDepartment = async (id: DepartmentId, department: UpdateDepartmentParams) => {
  const { session } = await getUserAuth();
  const { id: departmentId } = departmentIdSchema.parse({ id });
  const newDepartment = updateDepartmentSchema.parse({ ...department, userId: session?.user.id! });
  try {
    const d = await db.department.update({ where: { id: departmentId, userId: session?.user.id! }, data: newDepartment})
    return { department: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteDepartment = async (id: DepartmentId) => {
  const { session } = await getUserAuth();
  const { id: departmentId } = departmentIdSchema.parse({ id });
  try {
    const d = await db.department.delete({ where: { id: departmentId, userId: session?.user.id! }})
    return { department: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

