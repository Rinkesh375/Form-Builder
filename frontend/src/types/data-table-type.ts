import type { Submission } from "@/lib/types";
import type { Table } from "@tanstack/react-table";

export  interface DataTableProps {
  table: Table<Submission>;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  totalItems: number;
}


export interface DataPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

