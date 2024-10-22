// Body.test.tsx
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Body Component", () => {
  it("renders posts after fetching from API", async () => {
    render(<Header />);

    expect(screen.getByText("Twinkl Tech Task")).toBeInTheDocument();
  });
});
