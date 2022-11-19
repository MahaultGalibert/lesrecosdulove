import { vi, expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers, {
  TestingLibraryMatchers,
} from "@testing-library/jest-dom/matchers";

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}

// Extend except from testing-library
expect.extend(matchers);
// Set the cleanup function globally to avoid manual cleanup of each test file
afterEach(() => {
  cleanup();
});
