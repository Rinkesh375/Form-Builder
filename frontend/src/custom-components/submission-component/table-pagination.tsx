import { Button } from "@/components/ui/button";
import { DataPaginationProps } from "@/types/data-table-type";

export default function DataPagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
}: DataPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex-1 min-w-fit text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex-1 min-w-fit text-sm text-muted-foreground">
        Total Result : {totalItems}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 w-full lg:w-auto lg:flex-none">
        <Button
          onClick={() => {
            const minPage = Math.max(1, page - 1);
            onPageChange(minPage);
          }}
          disabled={page <= 1}
          variant={"outline"}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            const maxPage = Math.min(totalPages, page + 1);
            onPageChange(maxPage);
          }}
          disabled={page >= totalPages || totalPages <= 1}
          variant={"outline"}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
