import { SortOrder } from "./types";

export const queryKeys = {
  formSchema: ["formSchema"] as const,
  submissions: (params: {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: SortOrder;
    search: string;
    department: string;
  }) =>
    [
      "submissions",
      params.page,
      params.limit,
      params.sortBy,
      params.sortOrder,
      params.search ?? "",
      params.department ?? ""
    ] as const
};
