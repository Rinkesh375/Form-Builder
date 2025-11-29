"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createSubmission, updateSubmission } from "@/lib/api";
import { DepartmentEnum, Submission } from "@/lib/types";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { submissionSchema } from "@/lib/submission-schema";
import { format, isValid, parseISO } from "date-fns";

export default function DynamicSubmissionForm({
  initialValues,
}: {
  initialValues: Submission;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      firstName: initialValues?.firstName ?? "",
      age: initialValues?.age ?? 18,
      department: initialValues?.department ?? DepartmentEnum.Engineering,
      startDate: initialValues?.startDate
        ? new Date(initialValues.startDate)
        : new Date(),
      bio: initialValues?.bio ?? "",
      receiveNewsletter: initialValues?.receiveNewsletter ?? false,
    },
  });

  const createMut = useMutation({
    mutationFn: createSubmission,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast.success("Submission created");
      router.push("/submissions");
    },
    onError: (err) => toast.error(err?.message),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Submission }) =>
      updateSubmission(id, values),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ["submissions"] });
      await queryClient.invalidateQueries({ queryKey: ["submission", id] });
      toast.success("Submission updated");
      router.push("/submissions");
    },
    onError: (err: any) => toast.error(err?.message),
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMut.isPending || updateMut.isPending;

  const onSubmit = (values: z.infer<typeof submissionSchema>) => {
    if (isEdit && initialValues?.id) {
      updateMut.mutate({ id: initialValues.id, values });
    } else {
      createMut.mutate(values);
    }
  };

  return (
    <Card className="max-w-xl mx-auto border">
      <CardHeader>
        <CardTitle>
          {isEdit ? "Update Submission" : "Create Submission"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value && isValid(field.value)
                          ? format(field.value, "yyyy-MM-dd")
                          : ""
                      }
                      onChange={(e) => {
                        const dateValue = e.target.value;
                        if (dateValue) {
                          const newDate = parseISO(dateValue);
                          if (isValid(newDate)) {
                            field.onChange(newDate);
                          }
                        } else {
                          field.onChange(null);
                        }
                      }}
                      min="2000-01-01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Write bio..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="receiveNewsletter"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Receive Newsletter</FormLabel>
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-full">
              {isEdit ? "Update" : "Create"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
