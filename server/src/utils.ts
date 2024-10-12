import { fileURLToPath } from 'url';
import path from 'path';

// This function will return __filename and __dirname
export function getFileInfo() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	return { __filename, __dirname };
}
