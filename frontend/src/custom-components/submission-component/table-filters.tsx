"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowUpAZ, Eye, Pencil, Trash2 } from "lucide-react";
import useSubmissionFilters from "@/hooks/useSubmissionFilters";
import { SortOrder } from "@/types/types";
import DownloadCSVButton from "@/custom-components/download-csv-button";
import { TableFilterActionProps } from "@/types/data-table-type";

export default function TableFilters() {
  const [filters, setFilters] = useSubmissionFilters();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold">Submissions</h1>
        <p className="text-sm text-muted-foreground">
          View, search, sort & export.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Search…"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value, page: 1 })}
          className="w-48"
        />

        <Select
          value={filters.sortOrder}
          onValueChange={(v: SortOrder) =>
            setFilters({ sortOrder: v, page: 1 })
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortOrder.ASC}>
              <div className="flex items-center gap-2">
                <ArrowUpAZ className="h-4 w-4" />
                <span>Ascending</span>
              </div>
            </SelectItem>

            <SelectItem value={SortOrder.DESC}>
              <div className="flex items-center gap-2">
                <ArrowDownAZ className="h-4 w-4" />
                <span>Descending</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.department || "all"}
          onValueChange={(v) =>
            setFilters({ department: v === "all" ? "" : v, page: 1 })
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={String(filters.limit)}
          onValueChange={(v) => setFilters({ limit: Number(v), page: 1 })}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <DownloadCSVButton />
      </div>
    </div>
  );
}

export function TableActions({
  onView,
  onEdit,
  onDelete,
}: TableFilterActionProps) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={onView}>
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onEdit}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onDelete}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
