import {
  parseAsInteger,
  parseAsString,
  useQueryStates,
  parseAsStringEnum,
} from "nuqs";
import { SortOrder } from "@/lib/types";

export default function useSubmissionFilters() {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
    department: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),

    sortBy: parseAsString.withDefault("createdAt"),

    sortOrder: parseAsStringEnum<SortOrder>(
      Object.values(SortOrder)
    ).withDefault(SortOrder.DESC),

    limit: parseAsInteger.withDefault(10),
  });
}
