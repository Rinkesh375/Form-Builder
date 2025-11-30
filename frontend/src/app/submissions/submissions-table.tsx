"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import { fetchSubmissions, deleteSubmission } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { type Submission } from "@/types/types";
import useSubmissionFilters from "@/hooks/useSubmissionFilters";
import SubmissionDetailsDialog from "../../custom-components/submission-component/submission-details-dialog";
import TableFilters, {
  TableActions,
} from "../../custom-components/submission-component/table-filters";
import DataTable from "../../custom-components/submission-component/data-table";
import TablePagination from "../../custom-components/submission-component/table-pagination";
import { formatDateTime } from "@/constants/constants";
import useconfirm from "@/hooks/useConfirm";
import { useRouter } from "next/navigation";

export default function SubmissionsTableClient() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useSubmissionFilters();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.submissions(filters),
    queryFn: () => fetchSubmissions(filters),
    placeholderData: (prev) => prev,
  });

  const [selected, setSelected] = useState<Submission | null>(null);
  const [RemoveConfirmation, confirmRemove] = useconfirm(
    "Are you sure?",
    `The following action will remove selected form submission`
  );
  const router = useRouter();

  const deleteMut = useMutation({
    mutationFn: deleteSubmission,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["submissions"] }),
  });

  const columns = useMemo<ColumnDef<Submission>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: ({ row }) => {
          const id = row.original.id;

          return (
            <span className="font-mono text-xs">
              {id ? id.slice(0, 8) + "..." : "-"}
            </span>
          );
        },
      },

      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ row }) => {
          const createdAt = row.original.createdAt;
          if (!createdAt) return <span className="text-xs">-</span>;
          return <span className="text-xs">{formatDateTime(createdAt)}</span>;
        },
      },

      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <TableActions
            onView={() => setSelected(row.original)}
            onEdit={() => {
              router.push(`/submissions/${row.original.id}`);
            }}
            onDelete={() => {
              const id = row.original.id;
              if (id) handleConfirmRemoveAgent(id);
            }}
          />
        ),
      },
    ],
    [deleteMut]
  );

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleConfirmRemoveAgent = async (id: string) => {
    const ok = await confirmRemove();
    if (ok) {
      deleteMut.mutate(id);
    }
  };

  return (
    <div className="space-y-4 h-[80vh] overflow-y-scroll">
      <TableFilters />

      <DataTable
        table={table}
        isLoading={isLoading}
        isError={isError}
        error={error}
        totalItems={data?.totalItems ?? 0}
      />

      <TablePagination
        page={filters.page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={(page: number) => setFilters({ page })}
        totalItems={data?.totalItems ?? 0}
      />

      <SubmissionDetailsDialog
        submission={selected}
        onClose={() => setSelected(null)}
      />
      <RemoveConfirmation />
    </div>
  );
}
