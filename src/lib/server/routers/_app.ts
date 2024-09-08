import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { userRouter } from "./user";
import { collegeRouter } from "./college";
import { holidayRouter } from "./holiday";
import { departmentRouter } from "./department";
import { courseRouter } from "./course";
import { studentRouter } from "./student";
import { courseEnrolledStudentRouter } from "./courseEnrolledStudent";

export const appRouter = router({
  computers: computersRouter,
  user: userRouter,
  college: collegeRouter,
  holiday: holidayRouter,
  department: departmentRouter,
  course: courseRouter,
  student: studentRouter,
  courseEnrolledStudent: courseEnrolledStudentRouter,
});

export type AppRouter = typeof appRouter;
