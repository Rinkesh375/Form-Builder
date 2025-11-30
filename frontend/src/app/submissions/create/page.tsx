import { initialSubmission } from "@/constants/constants";
import DynamicFormClient from "@/custom-components/dynamic-form";

export default async function Page() {
  return <DynamicFormClient initialValues={initialSubmission} />;
}
