import { FormSchema, SubmissionsResponse, Submission } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw {
      status: res.status,
      message: data?.message || res.statusText,
      data,
    };
  }
  return res.json() as Promise<T>;
}

export async function fetchFormSchema(): Promise<FormSchema> {
  const res = await fetch(`${BASE_URL}/api/form-schema`, {
    cache: "no-store",
  });
  return handleResponse<FormSchema>(res);
}

export type ListSubmissionsParams = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  search?: string;
  department?: string;
};

export async function fetchSubmissions(
  params: ListSubmissionsParams
): Promise<SubmissionsResponse> {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    ...(params.search ? { search: params.search } : {}),
    ...(params.department ? { department: params.department } : {}),
  });

  const res = await fetch(`${BASE_URL}/api/submissions?${query.toString()}`, {
    cache: "no-store",
  });
  return handleResponse<SubmissionsResponse>(res);
}

export async function createSubmission(
  payload: Submission
): Promise<{ success: boolean; id: string; createdAt: string }> {
  const res = await fetch(`${BASE_URL}/api/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateSubmission(
  id: string,
  payload: Submission
): Promise<{ success: boolean; submission: Submission }> {
  const res = await fetch(`${BASE_URL}/api/submissions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteSubmission(
  id: string
): Promise<{ success: boolean }> {
  const res = await fetch(`${BASE_URL}/api/submissions/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

export async function fetchSubmissionById(
  id: string
): Promise<{ success: boolean; submission: Submission }> {
  const res = await fetch(`${BASE_URL}/api/submissions/${id}`, {
    cache: "no-store",
  });
  return handleResponse(res);
}
