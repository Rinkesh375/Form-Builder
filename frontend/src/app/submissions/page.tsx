import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchSubmissions } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { loadSearchParams } from "./(filters)/submissionFilters";
import { SearchParams } from "nuqs";
import SubmissionsTableClient from "./submissions-table";

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
      <SubmissionsTableClient />
    </HydrationBoundary>
  );
}
