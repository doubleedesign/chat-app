import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js'],
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
