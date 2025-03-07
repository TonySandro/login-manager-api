module.exports = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*protocols.ts",
    "!<rootDir>/src/main/**",
    "!<rootDir>/src/presentation/protocols/index.ts"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};


