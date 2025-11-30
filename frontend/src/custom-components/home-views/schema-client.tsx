"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchFormSchema } from "@/lib/api";
import SchemaView from "./schema-view";

export default function SchemaClien() {
  const { data } = useSuspenseQuery({
    queryKey: ["formSchema"],
    queryFn: fetchFormSchema,
  });

  return <SchemaView {...data} />;
}
