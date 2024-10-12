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
		'!src/constants.ts',
		'!src/index.ts',
	],
	forceExit: true, // make sure Jest exits after tests complete
	testMatch: ['**/*.test.ts'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.test.json',
		},
	},
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	setupFiles: ['./jest.globalMocks.ts'],
	setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
