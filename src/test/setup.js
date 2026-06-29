import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

class IntersectionObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

globalThis.IntersectionObserver = IntersectionObserverMock;

afterEach(() => {
  cleanup();
});
