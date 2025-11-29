import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchSubmissionById } from "@/lib/api";

import type { SubmissionUpdateIdPageProps } from "@/types/submission-id-page-props";
import SubmissionFormPage from "./submission-page";

export default async function Page({ params }: SubmissionUpdateIdPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["submission", id],
    queryFn: () => fetchSubmissionById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SubmissionFormPage id={id} />
    </HydrationBoundary>
  );
}
