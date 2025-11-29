import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.join(__dirname, '..', 'data', 'formSchema.json');

export async function getFormSchema() {
  const content = await fs.readFile(schemaPath, 'utf-8');
  return JSON.parse(content);
}
