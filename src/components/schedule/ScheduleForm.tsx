"use client";

import {
  Schedule,
  NewScheduleParams,
  insertScheduleParams,
} from "@/lib/db/schema/schedule";
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
import { Checkbox } from "@/components/ui/checkbox";
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

const ScheduleForm = ({
  schedule,
  closeModal,
}: {
  schedule?: Schedule;
  closeModal?: () => void;
}) => {
  const { data: days } = trpc.day.getDay.useQuery();
  const { data: periods } = trpc.period.getPeriod.useQuery();
  const { data: facultySubjects } =
    trpc.facultySubject.getFacultySubject.useQuery();
  const { data: sections } = trpc.section.getSection.useQuery();
  const editing = !!schedule?.id;

  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof insertScheduleParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertScheduleParams),
    defaultValues: schedule ?? {
      dayId: "",
      periodId: "",
      facultySubjectId: "",
      sectionId: "",
      version: 0,
      isActive: false,
      isDeleted: false,
      isArchived: false,
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

    await utils.schedule.getSchedule.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Schedule ${action}d!`);
  };

  const { mutate: createSchedule, isLoading: isCreating } =
    trpc.schedule.createSchedule.useMutation({
      onSuccess: () => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateSchedule, isLoading: isUpdating } =
    trpc.schedule.updateSchedule.useMutation({
      onSuccess: () => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteSchedule, isLoading: isDeleting } =
    trpc.schedule.deleteSchedule.useMutation({
      onSuccess: () => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewScheduleParams) => {
    if (editing) {
      updateSchedule({ ...values, id: schedule.id });
    } else {
      createSchedule(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="dayId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days?.day.map((day) => (
                      <SelectItem key={day.id} value={day.id.toString()}>
                        {day.id}{" "}
                        {/* TODO: Replace with a field from the day model */}
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
          name="periodId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a period" />
                  </SelectTrigger>
                  <SelectContent>
                    {periods?.period.map((period) => (
                      <SelectItem key={period.id} value={period.id.toString()}>
                        {period.id}{" "}
                        {/* TODO: Replace with a field from the period model */}
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
          name="facultySubjectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty Subject Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a faculty subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {facultySubjects?.facultySubject.map((facultySubject) => (
                      <SelectItem
                        key={facultySubject.id}
                        value={facultySubject.id.toString()}
                      >
                        {facultySubject.id}{" "}
                        {/* TODO: Replace with a field from the facultySubject model */}
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
          render={({ field }) => (
            <FormItem>
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
                    {sections?.section.map((section) => (
                      <SelectItem
                        key={section.id}
                        value={section.id.toString()}
                      >
                        {section.id}{" "}
                        {/* TODO: Replace with a field from the section model */}
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
          name="version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Version</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Active</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDeleted"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Deleted</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isArchived"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Archived</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={""}
                />
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
            onClick={() => deleteSchedule({ id: schedule.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ScheduleForm;
