// src/test/Routes.assets.test.jsx
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AssetsPage from "../pages/AssetsPage";

test("renders Assets table headers", () => {
  render(
    <MemoryRouter initialEntries={["/assets"]}>
      <Routes>
        <Route path="/assets" element={<AssetsPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole("columnheader", { name: /currency/i })).toBeInTheDocument();
  expect(screen.getByRole("columnheader", { name: /action/i })).toBeInTheDocument();
});
