import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Adventures from "./Adventures";

test("expect all media tiles are rendered", async () => {
  render(<Adventures />, { wrapper: BrowserRouter });

  expect(
    screen.getByText("Icewind Dale: Rime of the Frostmaiden")
  ).toBeInTheDocument();
});
