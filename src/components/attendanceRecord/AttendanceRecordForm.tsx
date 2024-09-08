"use client";

import { AttendanceRecord, NewAttendanceRecordParams, insertAttendanceRecordParams } from "@/lib/db/schema/attendanceRecord";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AttendanceRecordForm = ({
  attendanceRecord,
  closeModal,
}: {
  attendanceRecord?: AttendanceRecord;
  closeModal?: () => void;
}) => {
  const { data: enrollments } = trpc.enrollments.getEnrollments.useQuery();
  const { data: schedules } = trpc.schedules.getSchedules.useQuery();
  const { data: faculties } = trpc.faculties.getFaculties.useQuery();
  const { data: scheduleHistories } = trpc.scheduleHistories.getScheduleHistories.useQuery();
  const editing = !!attendanceRecord?.id;

  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof insertAttendanceRecordParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAttendanceRecordParams),
    defaultValues: attendanceRecord ?? {
      date: new Date(),
     enrollmentId: "",
     scheduleId: "",
     isPresent: false,
     facultyId: "",
     scheduleHistoryId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.attendanceRecord.getAttendanceRecord.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Attendance Record ${action}d!`);
  };

  const { mutate: createAttendanceRecord, isLoading: isCreating } =
    trpc.attendanceRecord.createAttendanceRecord.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAttendanceRecord, isLoading: isUpdating } =
    trpc.attendanceRecord.updateAttendanceRecord.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAttendanceRecord, isLoading: isDeleting } =
    trpc.attendanceRecord.deleteAttendanceRecord.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAttendanceRecordParams) => {
    if (editing) {
      updateAttendanceRecord({ ...values, id: attendanceRecord.id });
    } else {
      createAttendanceRecord(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (<FormItem>
              <FormLabel>Date</FormLabel>
                <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enrollmentId"
          render={({ field }) => (<FormItem>
              <FormLabel>Enrollment Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a enrollment" />
                  </SelectTrigger>
                  <SelectContent>
                    {enrollments?.enrollments.map((enrollment) => (
                      <SelectItem key={enrollment.id} value={enrollment.id.toString()}>
                        {enrollment.id}  {/* TODO: Replace with a field from the enrollment model */}
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
          name="scheduleId"
          render={({ field }) => (<FormItem>
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
                    {schedules?.schedules.map((schedule) => (
                      <SelectItem key={schedule.id} value={schedule.id.toString()}>
                        {schedule.id}  {/* TODO: Replace with a field from the schedule model */}
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
          name="isPresent"
          render={({ field }) => (<FormItem>
              <FormLabel>Is Present</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facultyId"
          render={({ field }) => (<FormItem>
              <FormLabel>Faculty Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties?.faculties.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id.toString()}>
                        {faculty.id}  {/* TODO: Replace with a field from the faculty model */}
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
          name="scheduleHistoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Schedule History Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a schedule history" />
                  </SelectTrigger>
                  <SelectContent>
                    {scheduleHistories?.scheduleHistories.map((scheduleHistory) => (
                      <SelectItem key={scheduleHistory.id} value={scheduleHistory.id.toString()}>
                        {scheduleHistory.id}  {/* TODO: Replace with a field from the scheduleHistory model */}
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
            onClick={() => deleteAttendanceRecord({ id: attendanceRecord.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AttendanceRecordForm;
