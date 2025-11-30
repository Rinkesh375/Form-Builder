import { getFormSchema } from "../services/formSchema.service.js";
import {
  createSubmission,
  listSubmissions,
  updateSubmission,
  deleteSubmission,
  getSubmissionById,
  getAllSubmissions,
} from "../services/submissions.service.js";
import { validateSubmissionAgainstSchema } from "../services/validation.service.js";
import { convertToCSV } from "../utils/csv-util.js";

export async function createSubmissionHandler(req, res, next) {
  try {
    const schema = await getFormSchema();
    const payload = req?.body || {};


    const { isValid, errors } = validateSubmissionAgainstSchema(
      schema,
      payload
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const submission = await createSubmission(payload);

    return res.status(201).json({
      success: true,
      id: submission.id,
      createdAt: submission.createdAt,
    });
  } catch (err) {
    next(err);
  }
}

export async function listSubmissionsHandler(req, res, next) {
  try {
    const { page, limit, sortBy, sortOrder, search, department } = req.query;
    const result = await listSubmissions({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      sortBy: sortBy || "createdAt",
      sortOrder: sortOrder === "asc" ? "asc" : "desc",
      search,
      department,
    });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function downloadCSVHandler(req, res, next) {
  try {
    const submissions = await getAllSubmissions();

    const csv = convertToCSV(submissions);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=submissions.csv"
    );

    return res.status(200).send(csv);
  } catch (err) {
    next(err);
  }
}

export async function updateSubmissionHandler(req, res, next) {
  try {
    const { id } = req.params;
    const schema = await getFormSchema();
    const payload = req.body || {};

    const { isValid, errors } = validateSubmissionAgainstSchema(
      schema,
      payload
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const updated = await updateSubmission(id, payload);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      submission: updated,
    });
  } catch (err) {
    next(err);
  }
}

export async function getSubmissionByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const submission = await getSubmissionById(id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      submission,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteSubmissionHandler(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await deleteSubmission(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Submission deleted",
    });
  } catch (err) {
    next(err);
  }
}
