"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import type { SubmissionDialogProps } from "@/types/submission-details-dialog-type";
import { format } from "date-fns";

export default function SubmissionDetailsDialog({
  submission,
  onClose,
}: SubmissionDialogProps) {
  if (!submission) return null;

  const {
    id,
    department,
    firstName,
    age,
    startDate,
    bio,
    receiveNewsletter,
  } = submission;

  const formattedDate = startDate
    ? format(new Date(startDate), "dd MMM yyyy")
    : "N/A";

  const rows = [
    { label: "ID", value: id },
    { label: "First Name", value: firstName },
    { label: "Age", value: age },
    { label: "Department", value: department },
    { label: "Start Date", value: formattedDate },
    { label: "Bio", value: bio },
    { label: "Receive Newsletter", value: receiveNewsletter ? "Yes" : "No" },
  ];

  return (
    <Dialog open={!!submission} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-center">Submission Details</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh] px-4 py-3">
          <div className="space-y-4">
            {rows.map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <Label className="text-sm font-medium">{label}</Label>
                <div className="rounded-md bg-muted px-3 py-2 text-sm">
                  {value ?? "N/A"}
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
