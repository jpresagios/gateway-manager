module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
