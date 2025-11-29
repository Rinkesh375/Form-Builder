import { Router } from "express";
import {
  createSubmissionHandler,
  listSubmissionsHandler,
  updateSubmissionHandler,
  deleteSubmissionHandler,
  getSubmissionByIdHandler,
} from "../controllers/submissions.controller.js";

const router = Router();

router.post("/", createSubmissionHandler);

router.get("/", listSubmissionsHandler);

router.get("/:id", getSubmissionByIdHandler);

router.put("/:id", updateSubmissionHandler);

router.delete("/:id", deleteSubmissionHandler);

export default router;
