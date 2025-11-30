import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchFormSchema } from "@/lib/api";
import SchemaClient from "@/custom-components/home-views/schema-client";
import { Suspense } from "react";
import LoadingState from "@/custom-components/Loading-state";
import { ErrorBoundary } from "react-error-boundary";
import ErrorState from "@/custom-components/Error-state";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["formSchema"],
    queryFn: fetchFormSchema,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading form schema data"
            description="This may take a few seconds"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Error while fetching schema data"
              description="Something went wrong. Please try again later."
            />
          }
        >
          <SchemaClient />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
