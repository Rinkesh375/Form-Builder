import { DepartmentEnum } from "./types";

export enum FieldType {
  Text = "text",
  Number = "number",
  Select = "select",
  Date = "date",
  Textarea = "textarea",
  Switch = "switch",
}

export interface TextValidations {
  minLength?: number;
  maxLength?: number;
}

export interface NumberValidations {
  min?: number;
  max?: number;
}

export interface DateValidations {
  minDate?: string;
}

export type FieldValidations =
  | TextValidations
  | NumberValidations
  | DateValidations
  | undefined;

export interface FormField {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: DepartmentEnum[];
  validations?: FieldValidations;
}

export interface FormSchema {
  title: string;
  nameSchema: string;
  fields: FormField[];
}
