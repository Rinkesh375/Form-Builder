"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchSubmissionById } from "@/lib/api";
import DynamicFormClient from "@/custom-components/dynamic-form";

export default function SubmissionFormPage({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["submission", id],
    queryFn: () => fetchSubmissionById(id),
  });

  if (isLoading || !data) return <p>Loading...</p>;

  return <DynamicFormClient initialValues={data.submission} />;
}
