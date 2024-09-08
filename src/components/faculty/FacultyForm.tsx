"use client";

import { Faculty, NewFacultyParams, insertFacultyParams } from "@/lib/db/schema/faculty";
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

const FacultyForm = ({
  faculty,
  closeModal,
}: {
  faculty?: Faculty;
  closeModal?: () => void;
}) => {
  const { data: departments } = trpc.departments.getDepartments.useQuery();
  const editing = !!faculty?.id;

  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof insertFacultyParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertFacultyParams),
    defaultValues: faculty ?? {
      name: "",
     departmentId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.faculty.getFaculty.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Faculty ${action}d!`);
  };

  const { mutate: createFaculty, isLoading: isCreating } =
    trpc.faculty.createFaculty.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateFaculty, isLoading: isUpdating } =
    trpc.faculty.updateFaculty.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteFaculty, isLoading: isDeleting } =
    trpc.faculty.deleteFaculty.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewFacultyParams) => {
    if (editing) {
      updateFaculty({ ...values, id: faculty.id });
    } else {
      createFaculty(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (<FormItem>
              <FormLabel>Department Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments?.departments.map((department) => (
                      <SelectItem key={department.id} value={department.id.toString()}>
                        {department.id}  {/* TODO: Replace with a field from the department model */}
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
            onClick={() => deleteFaculty({ id: faculty.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default FacultyForm;
