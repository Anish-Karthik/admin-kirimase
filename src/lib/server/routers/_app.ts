import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { userRouter } from "./user";
import { collegeRouter } from "./college";

export const appRouter = router({
  computers: computersRouter,
  user: userRouter,
  college: collegeRouter,
});

export type AppRouter = typeof appRouter;
