import { db } from "@/lib/db/index";
import { 
  FacultyId, 
  NewFacultyParams,
  UpdateFacultyParams, 
  updateFacultySchema,
  insertFacultySchema, 
  facultyIdSchema 
} from "@/lib/db/schema/faculty";
import { getUserAuth } from "@/lib/auth/utils";

export const createFaculty = async (faculty: NewFacultyParams) => {
  const { session } = await getUserAuth();
  const newFaculty = insertFacultySchema.parse({ ...faculty, userId: session?.user.id! });
  try {
    const f = await db.faculty.create({ data: newFaculty });
    return { faculty: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFaculty = async (id: FacultyId, faculty: UpdateFacultyParams) => {
  const { session } = await getUserAuth();
  const { id: facultyId } = facultyIdSchema.parse({ id });
  const newFaculty = updateFacultySchema.parse({ ...faculty, userId: session?.user.id! });
  try {
    const f = await db.faculty.update({ where: { id: facultyId, userId: session?.user.id! }, data: newFaculty})
    return { faculty: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFaculty = async (id: FacultyId) => {
  const { session } = await getUserAuth();
  const { id: facultyId } = facultyIdSchema.parse({ id });
  try {
    const f = await db.faculty.delete({ where: { id: facultyId, userId: session?.user.id! }})
    return { faculty: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

