import { Router } from 'express';
import { getFormSchemaHandler } from '../controllers/formSchema.controller.js';

const router = Router();

// GET /api/form-schema
router.get('/', getFormSchemaHandler);

export default router;
