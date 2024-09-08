"use client";

import { ElectiveSubject, NewElectiveSubjectParams, insertElectiveSubjectParams } from "@/lib/db/schema/electiveSubject";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ElectiveSubjectForm = ({
  electiveSubject,
  closeModal,
}: {
  electiveSubject?: ElectiveSubject;
  closeModal?: () => void;
}) => {
  const { data: courseEnrolledStudents } = trpc.courseEnrolledStudents.getCourseEnrolledStudents.useQuery();
  const { data: subjects } = trpc.subjects.getSubjects.useQuery();
  const { data: sections } = trpc.sections.getSections.useQuery();
  const editing = !!electiveSubject?.id;

  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof insertElectiveSubjectParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertElectiveSubjectParams),
    defaultValues: electiveSubject ?? {
      courseEnrolledStudentId: "",
     subjectId: "",
     sectionId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.electiveSubject.getElectiveSubject.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Elective Subject ${action}d!`);
  };

  const { mutate: createElectiveSubject, isLoading: isCreating } =
    trpc.electiveSubject.createElectiveSubject.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateElectiveSubject, isLoading: isUpdating } =
    trpc.electiveSubject.updateElectiveSubject.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteElectiveSubject, isLoading: isDeleting } =
    trpc.electiveSubject.deleteElectiveSubject.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewElectiveSubjectParams) => {
    if (editing) {
      updateElectiveSubject({ ...values, id: electiveSubject.id });
    } else {
      createElectiveSubject(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="courseEnrolledStudentId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Enrolled Student Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course enrolled student" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseEnrolledStudents?.courseEnrolledStudents.map((courseEnrolledStudent) => (
                      <SelectItem key={courseEnrolledStudent.id} value={courseEnrolledStudent.id.toString()}>
                        {courseEnrolledStudent.id}  {/* TODO: Replace with a field from the courseEnrolledStudent model */}
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
          name="subjectId"
          render={({ field }) => (<FormItem>
              <FormLabel>Subject Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects?.subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.id}  {/* TODO: Replace with a field from the subject model */}
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
          name="sectionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Section Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections?.sections.map((section) => (
                      <SelectItem key={section.id} value={section.id.toString()}>
                        {section.id}  {/* TODO: Replace with a field from the section model */}
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
            onClick={() => deleteElectiveSubject({ id: electiveSubject.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ElectiveSubjectForm;
