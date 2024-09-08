"use client";

import {
  ScheduleHistory,
  NewScheduleHistoryParams,
  insertScheduleHistoryParams,
} from "@/lib/db/schema/scheduleHistory";
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
// import { Input } from "@/components/ui/input";
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

const ScheduleHistoryForm = ({
  scheduleHistory,
  closeModal,
}: {
  scheduleHistory?: ScheduleHistory;
  closeModal?: () => void;
}) => {
  const { data: schedules } = trpc.schedule.getSchedule.useQuery();
  const { data: days } = trpc.day.getDay.useQuery();
  const { data: periods } = trpc.period.getPeriod.useQuery();
  const { data: facultySubjects } =
    trpc.facultySubject.getFacultySubject.useQuery();
  const editing = !!scheduleHistory?.id;

  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof insertScheduleHistoryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertScheduleHistoryParams),
    defaultValues: scheduleHistory ?? {
      scheduleId: "",
      dayId: "",
      periodId: "",
      facultySubjectId: "",
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

    await utils.scheduleHistory.getScheduleHistory.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Schedule History ${action}d!`);
  };

  const { mutate: createScheduleHistory, isLoading: isCreating } =
    trpc.scheduleHistory.createScheduleHistory.useMutation({
      onSuccess: () => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateScheduleHistory, isLoading: isUpdating } =
    trpc.scheduleHistory.updateScheduleHistory.useMutation({
      onSuccess: () => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteScheduleHistory, isLoading: isDeleting } =
    trpc.scheduleHistory.deleteScheduleHistory.useMutation({
      onSuccess: () => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewScheduleHistoryParams) => {
    if (editing) {
      updateScheduleHistory({ ...values, id: scheduleHistory.id });
    } else {
      createScheduleHistory(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="scheduleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    {schedules?.schedule.map((schedule) => (
                      <SelectItem
                        key={schedule.id}
                        value={schedule.id.toString()}
                      >
                        {schedule.id}{" "}
                        {/* TODO: Replace with a field from the schedule model */}
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
            onClick={() => deleteScheduleHistory({ id: scheduleHistory.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ScheduleHistoryForm;
