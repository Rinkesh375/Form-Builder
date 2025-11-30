import { Submission } from "@/types/types";

export interface SubmissionDialogProps {
  submission: Submission | null;
  onClose: () => void;
}
