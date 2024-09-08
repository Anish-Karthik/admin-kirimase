import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { userRouter } from "./user";
import { collegeRouter } from "./college";
import { holidayRouter } from "./holiday";
import { departmentRouter } from "./department";
import { courseRouter } from "./course";
import { studentRouter } from "./student";
import { courseEnrolledStudentRouter } from "./courseEnrolledStudent";
import { periodRouter } from "./period";
import { sectionRouter } from "./section";
import { subjectRouter } from "./subject";
import { electiveSubjectRouter } from "./electiveSubject";
import { enrollmentRouter } from "./enrollment";
import { facultyRouter } from "./faculty";
import { facultySubjectRouter } from "./facultySubject";
import { scheduleRouter } from "./schedule";
import { scheduleHistoryRouter } from "./scheduleHistory";

export const appRouter = router({
  computers: computersRouter,
  user: userRouter,
  college: collegeRouter,
  holiday: holidayRouter,
  department: departmentRouter,
  course: courseRouter,
  student: studentRouter,
  courseEnrolledStudent: courseEnrolledStudentRouter,
  period: periodRouter,
  section: sectionRouter,
  subject: subjectRouter,
  electiveSubject: electiveSubjectRouter,
  enrollment: enrollmentRouter,
  faculty: facultyRouter,
  facultySubject: facultySubjectRouter,
  schedule: scheduleRouter,
  scheduleHistory: scheduleHistoryRouter,
});

export type AppRouter = typeof appRouter;
