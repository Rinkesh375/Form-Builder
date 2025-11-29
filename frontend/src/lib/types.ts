export type FieldType =
  | "text"
  | "number"
  | "select"
  | "multi-select"
  | "date"
  | "textarea"
  | "switch";

export type FormField = {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validations?: {
    minLength?: number;
    maxLength?: number;
    regex?: string;
    min?: number;
    max?: number;
    minDate?: string;
    minSelected?: number;
    maxSelected?: number;
  };
};

export type FormSchema = {
  title: string;
  description: string;
  fields: FormField[];
};

export type Submission = {
  id?: string;
  firstName: string;
  age: number;
  department: DepartmentEnum;
  startDate: Date;
  bio?: string;
  receiveNewsletter?: boolean;
  createdAt?: Date;
};

export type SubmissionsResponse = {
  data: Submission[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export type FiltersParams = {
  page: number;
  search: string;
  department: string;
  sortBy: string;
  sortOrder: SortOrder;
  limit: number;
};

export enum DepartmentEnum {
  Engineering = "Engineering",
  Product = "Product",
  Design = "Design",
  HR = "HR",
  Sales = "Sales",
}
