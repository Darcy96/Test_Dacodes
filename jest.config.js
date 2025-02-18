const nextJest = require('next/jest')

const createJestConfig = nextJest({
	dir: './'
})

const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules', '<rootDir>/'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^@components/(.*)$': '<rootDir>/app/components/$1',
		'^@constants/(.*)$': '<rootDir>/app/constants/$1',
		'^@hooks/(.*)$': '<rootDir>/app/hooks/$1',
		'^@utils/(.*)$': '<rootDir>/app/utils/$1',
		'^app/(.*)$': '<rootDir>/app/$1',
		'^@api/(.*)$': '<rootDir>/app/api/$1'
	},
	testMatch: [
		'**/__tests__/**/*.test.[jt]s?(x)',
		'**/?(*.)+(spec|test).[jt]s?(x)'
	],
	collectCoverage: true,
	collectCoverageFrom: [
		'app/**/*.{js,jsx,ts,tsx}',
		'!app/**/*.d.ts',
		'!app/**/_*.{js,jsx,ts,tsx}',
		'!app/**/*.stories.{js,jsx,ts,tsx}'
	],
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70
		}
	}
}

module.exports = createJestConfig(customJestConfig)
