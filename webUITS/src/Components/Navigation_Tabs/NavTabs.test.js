import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import NavTabs from "./NavTabs";

test("make sure the headers are there", async () => {
  render(<NavTabs />, { wrapper: BrowserRouter });

  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Adventures")).toBeInTheDocument();
  expect(screen.getByText("Bard Shorts")).toBeInTheDocument();
});
