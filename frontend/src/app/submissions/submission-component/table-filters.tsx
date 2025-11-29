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
import { Download, Eye, Pencil, SortAsc, Trash2 } from "lucide-react";
import useSubmissionFilters from "@/hooks/useSubmissionFilters";
import { SortOrder } from "@/lib/types";

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
          onValueChange={(v: SortOrder) => setFilters({ sortOrder: v })}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Sort Order Created At" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortOrder.ASC}>Ascending</SelectItem>
            <SelectItem value={SortOrder.DESC}>Descending</SelectItem>
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

        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

TableFilters.Actions = function Actions({
  submission,
  onView,
  onEdit,
  onDelete,
}: any) {
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
};
