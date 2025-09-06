// src/test/setup.ts
import { expect, afterEach } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Auto-cleanup after each test (like Jest config does)
afterEach(() => {
  cleanup();
});
