import { DepartmentEnum } from "@/types/types";
import { format } from "date-fns";

export const formatDateTime = (value: Date) => {
  const date = new Date(value);
  return isNaN(date.getTime()) ? "-" : format(date, "dd MMM yyyy, HH:mm:ss");
};

export const initialSubmission = {
  firstName: "",
  age: 18,
  department: DepartmentEnum.Engineering,
  startDate: new Date("2000-01-01"),
  bio: "",
  receiveNewsletter: false,
};
