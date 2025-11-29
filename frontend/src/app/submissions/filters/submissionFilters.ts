import { SortOrder } from "@/lib/types";
import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

export const filterSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  department: parseAsString
    .withDefault("")
    .withOptions({ clearOnDefault: true }),
  sortBy: parseAsString.withDefault("createdAt"),
  sortOrder: parseAsStringEnum<SortOrder>(Object.values(SortOrder)).withDefault(
    SortOrder.DESC
  ),
  limit: parseAsInteger.withDefault(10),
};

export const loadSearchParams = createLoader(filterSearchParams);
