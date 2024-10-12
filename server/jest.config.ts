import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js'],
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/docs/**',
		'!src/types.ts',
	],
	forceExit: true, // make sure Jest exits after tests complete
	testMatch: ['**/*.test.ts'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
	setupFiles: ['./jest.globalMocks.ts'],
	setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
