"use client";

import {
  CourseEnrolledStudent,
  NewCourseEnrolledStudentParams,
  insertCourseEnrolledStudentParams,
} from "@/lib/db/schema/courseEnrolledStudent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { onError } from "@/lib/utils";

const CourseEnrolledStudentForm = ({
  courseEnrolledStudent,
  closeModal,
}: {
  courseEnrolledStudent?: CourseEnrolledStudent;
  closeModal?: () => void;
}) => {
  const { data: courses } = trpc.course.getCourse.useQuery();
  const { data: students } = trpc.student.getStudent.useQuery();
  const editing = !!courseEnrolledStudent?.id;

  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof insertCourseEnrolledStudentParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCourseEnrolledStudentParams),
    defaultValues: courseEnrolledStudent ?? {
      batchYear: 0,
      courseId: "",
      studentId: "",
    },
  });

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string }
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    await utils.courseEnrolledStudent.getCourseEnrolledStudent.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Course Enrolled Student ${action}d!`);
  };

  const { mutate: createCourseEnrolledStudent, isLoading: isCreating } =
    trpc.courseEnrolledStudent.createCourseEnrolledStudent.useMutation({
      onSuccess: () => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCourseEnrolledStudent, isLoading: isUpdating } =
    trpc.courseEnrolledStudent.updateCourseEnrolledStudent.useMutation({
      onSuccess: () => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCourseEnrolledStudent, isLoading: isDeleting } =
    trpc.courseEnrolledStudent.deleteCourseEnrolledStudent.useMutation({
      onSuccess: () => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCourseEnrolledStudentParams) => {
    if (editing) {
      updateCourseEnrolledStudent({ ...values, id: courseEnrolledStudent.id });
    } else {
      createCourseEnrolledStudent(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="batchYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Year</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses?.course.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.id}{" "}
                        {/* TODO: Replace with a field from the course model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students?.student.map((student) => (
                      <SelectItem
                        key={student.id}
                        value={student.id.toString()}
                      >
                        {student.id}{" "}
                        {/* TODO: Replace with a field from the student model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() =>
              deleteCourseEnrolledStudent({ id: courseEnrolledStudent.id })
            }
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CourseEnrolledStudentForm;
