// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleDirectories: ['node_modules', 'src'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
    },
}
