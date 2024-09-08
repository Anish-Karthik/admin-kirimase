import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { userRouter } from "./user";

export const appRouter = router({
  computers: computersRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
