import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { userRouter } from "./user";
import { collegeRouter } from "./college";
import { holidayRouter } from "./holiday";
import { departmentRouter } from "./department";
import { courseRouter } from "./course";

export const appRouter = router({
  computers: computersRouter,
  user: userRouter,
  college: collegeRouter,
  holiday: holidayRouter,
  department: departmentRouter,
  course: courseRouter,
});

export type AppRouter = typeof appRouter;
