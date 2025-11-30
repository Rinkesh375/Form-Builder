import type { Submission } from "@/types/types";
import type { Table } from "@tanstack/react-table";

export interface DataTableProps {
  table: Table<Submission>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  totalItems: number;
}

export interface DataPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export interface TableFilterActionProps {
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}
