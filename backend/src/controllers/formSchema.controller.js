import { getFormSchema } from '../services/formSchema.service.js';

export async function getFormSchemaHandler(req, res, next) {
  try {
    const schema = await getFormSchema();
    return res.status(200).json(schema);
  } catch (err) {
    next(err);
  }
}
