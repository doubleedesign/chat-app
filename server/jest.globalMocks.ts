/**
 * Chalk causes errors in tests because of its use of require()
 * and it doesn't need to be actually called in tests anyway
 */
jest.mock('chalk', () => ({
	green: jest.fn(),
	red: jest.fn(),
	cyan: jest.fn(),
	yellow: jest.fn(),
	magenta: jest.fn(),
}));

/**
 * Mock the fileURLToPath function that is used in index.ts to help with documentation assets
 * but is not required in tests but still causes errors when wrapped in an environment check
 */
jest.mock('./src/utils.ts', () => ({
	getFileInfo: jest.fn().mockImplementation(() => {
		return {
			__filename: '',
			__dirname: '',
		};
	}),
}));
