import { render, screen, fireEvent, within } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import ConverterModal from "../components/ConverterModal";

beforeEach(() => {
  // Mock the first provider to return a deterministic result
  global.fetch = vi.fn(async () => ({
    ok: true,
    json: async () => ({ result: 200, info: { rate: 2 } }),
  }));
});

afterEach(() => {
  vi.resetAllMocks();
});

test("shows conversion result", async () => {
  render(
    <ConverterModal
      open={true}
      onClose={() => {}}
      presetFrom="USD"
      presetTo="EUR"
    />
  );

  // enter amount
  const input = screen.getByPlaceholderText(/enter amount/i);
  fireEvent.change(input, { target: { value: "100" } });

  // click convert
  fireEvent.click(screen.getByRole("button", { name: /convert/i }));

  // scope search to the dialog to avoid duplicates elsewhere
  const dialog = screen.getByRole("dialog");

  // match across nested elements by evaluating node.textContent
  const matches = await within(dialog).findAllByText((_content, node) => {
    const text = node?.textContent || "";
    return /100\s*USD\s*≈\s*200\s*EUR/i.test(text);
  });

  expect(matches.length).toBeGreaterThan(0);
});
