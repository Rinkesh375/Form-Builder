import { DepartmentEnum, type Submission } from "../types/types";
import { z } from "zod";

export const submissionSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),
  age: z
    .number({ message: "Age must be a number" })
    .min(18, "Age must be at least 18")
    .max(70, "Age must be 70 or below"),
  department: z.enum(
    [
      DepartmentEnum.Engineering,
      DepartmentEnum.Design,
      DepartmentEnum.HR,
      DepartmentEnum.Product,
      DepartmentEnum.Sales,
    ],
    {
      message: "Department is required",
    }
  ),
  startDate: z
    .date({ message: "Start date is required" })
    .refine(
      (date) => date.getFullYear() >= 2000,
      "Start date cannot be before year 2000"
    ),
  bio: z.string().optional(),
  receiveNewsletter: z.boolean().optional(),
});
