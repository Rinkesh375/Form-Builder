"use client";
import { Button } from "@/components/ui/button";
import { getSubmissionsCSV } from "@/lib/api";
import { Download } from "lucide-react";

export default function DownloadCSVButton() {
  async function handleDownload() {
    const csv = await getSubmissionsCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "submissions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Button variant="outline" onClick={handleDownload}>
        <Download className="h-4 w-4" />
        CSV
      </Button>
    </>
  );
}
