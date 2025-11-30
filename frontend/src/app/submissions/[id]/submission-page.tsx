"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchSubmissionById } from "@/lib/api";
import DynamicFormClient from "@/custom-components/dynamic-form";

export default function SubmissionFormPage({ id }: { id: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["submission", id],
    queryFn: () => fetchSubmissionById(id),
  });

  return <DynamicFormClient initialValues={data.submission} />;
}
