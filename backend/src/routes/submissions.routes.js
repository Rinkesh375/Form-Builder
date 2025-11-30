import { Router } from "express";
import {
  createSubmissionHandler,
  listSubmissionsHandler,
  updateSubmissionHandler,
  deleteSubmissionHandler,
  getSubmissionByIdHandler,
  downloadCSVHandler,
} from "../controllers/submissions.controller.js";

const router = Router();

router.get("/", listSubmissionsHandler);
router.get("/csv", downloadCSVHandler);
router.get("/:id", getSubmissionByIdHandler);
router.post("/", createSubmissionHandler);
router.put("/:id", updateSubmissionHandler);
router.delete("/:id", deleteSubmissionHandler);

export default router;
