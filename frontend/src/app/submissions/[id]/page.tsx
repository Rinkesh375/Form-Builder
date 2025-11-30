import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchSubmissionById } from "@/lib/api";
import type { SubmissionUpdateIdPageProps } from "@/types/submission-id-page-props";
import SubmissionFormPage from "./submission-page";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingState from "@/custom-components/Loading-state";
import ErrorState from "@/custom-components/Error-state";

export default async function Page({ params }: SubmissionUpdateIdPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["submission", id],
    queryFn: () => fetchSubmissionById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Submission data"
            description="This may take a few seconds"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Error while fetching submission data"
              description="Something went wrong. Please try again later."
            />
          }
        >
          <SubmissionFormPage id={id} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
