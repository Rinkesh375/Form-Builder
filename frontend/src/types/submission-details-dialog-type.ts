import { Submission } from "@/lib/types";

export interface SubmissionDialogProps {
  submission: Submission | null;
  onClose: () => void;
}
