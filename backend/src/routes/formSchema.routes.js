import { Router } from "express";
import { getFormSchemaHandler } from "../controllers/formSchema.controller.js";

const router = Router();
router.get("/", getFormSchemaHandler);

export default router;
