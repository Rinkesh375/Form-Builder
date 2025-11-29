import { v4 as uuidv4 } from "uuid";
import { readJsonFile, writeJsonFile } from "./fileStorage.service.js";

const SUBMISSIONS_FILE = "submissions.json";

export async function getAllSubmissions() {
  const submissions = await readJsonFile(SUBMISSIONS_FILE, []);
  const data = Array.isArray(submissions) ? submissions : [];
  return data;
}

async function saveAllSubmissions(submissions) {
  await writeJsonFile(SUBMISSIONS_FILE, submissions);
}

export async function createSubmission(payload) {
  const submissions = await getAllSubmissions();

  const newSubmission = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    ...payload,
  };

  submissions.push(newSubmission);
  await saveAllSubmissions(submissions);

  return newSubmission;
}

export async function listSubmissions({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
  search,
  department,
}) {
  let submissions = await getAllSubmissions();

  if (search) {
    const searchLower = String(search).toLowerCase();
    submissions = submissions.filter((sub) =>
      Object.values(sub).some(
        (val) =>
          typeof val === "string" && val.toLowerCase().includes(searchLower)
      )
    );
  }

  if (department) {
    submissions = submissions.filter((sub) => sub.department === department);
  }

  if (sortBy === "createdAt") {
    submissions.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      if (sortOrder === "asc") return aTime - bTime;
      return bTime - aTime;
    });
  }

  const totalItems = submissions.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  const currentPage = Math.max(1, Number(page) || 1);
  const safeLimit = [10, 20, 50].includes(Number(limit)) ? Number(limit) : 10;

  const start = (currentPage - 1) * safeLimit;
  const end = start + safeLimit;

  const pagedData = submissions.slice(start, end);

  return {
    data: pagedData,
    page: currentPage,
    limit: safeLimit,
    totalItems,
    totalPages,
  };
}

export async function updateSubmission(id, payload) {
  const submissions = await getAllSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index === -1) {
    return null;
  }

  const existing = submissions[index];

  const updated = {
    ...existing,
    ...payload,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };

  submissions[index] = updated;
  await saveAllSubmissions(submissions);

  return updated;
}

export async function deleteSubmission(id) {
  const submissions = await getAllSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index === -1) {
    return false;
  }

  submissions.splice(index, 1);
  await saveAllSubmissions(submissions);
  return true;
}

export async function getSubmissionById(id) {
  const submissions = await getAllSubmissions();
  return submissions.find((s) => s.id === id) || null;
}
