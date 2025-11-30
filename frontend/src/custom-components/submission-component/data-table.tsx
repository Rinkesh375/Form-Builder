"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ErrorState from "@/custom-components/Error-state";
import LoadingState from "@/custom-components/Loading-state";
import { DataTableProps } from "@/types/data-table-type";
import { flexRender } from "@tanstack/react-table";

export default function DataTable({
  table,
  isLoading,
  isError,
  error,
  totalItems,
}: DataTableProps) {
  if (isLoading) {
    return (
      <LoadingState
        title="Loading Table Submission data"
        description="This may take a few seconds"
      />
    );
  } else if (isError) {
    <ErrorState
      title="Error while fetching submission data"
      description={
        error?.message ?? "Something went wrong. Please try again later."
      }
    />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead key={h.id}>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((r) => (
              <TableRow key={r.id}>
                {r.getVisibleCells().map((c) => (
                  <TableCell key={c.id}>
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="text-center py-8"
              >
                {totalItems ? "No results on this page" : "No submissions"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
