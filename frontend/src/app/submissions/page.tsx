import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchSubmissions } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { loadSearchParams } from "./filters/submissionFilters";
import { SearchParams } from "nuqs";
import SubmissionsTableClient from "./submissions-table";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingState from "@/custom-components/Loading-state";
import ErrorState from "@/custom-components/Error-state";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = await loadSearchParams(searchParams);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.submissions({ ...filters }),
    queryFn: () => fetchSubmissions({ ...filters }),
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
          <SubmissionsTableClient />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
