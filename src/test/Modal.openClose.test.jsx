// src/test/Modal.openClose.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ConverterModal from "../components/ConverterModal";

test("opens and closes modal", () => {
  function Wrapper() {
    const [open, setOpen] = React.useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <ConverterModal open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  render(<Wrapper />);

  // Visible
  expect(screen.getByRole("dialog")).toBeInTheDocument();

  // Close via the explicit close button (has aria-label="Close")
  const closeBtn = screen.getByRole("button", { name: /close/i });
  fireEvent.click(closeBtn);

  // Should be gone
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
