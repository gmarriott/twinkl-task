// Body.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Body } from "./Body";

// Mock the fetch API using Vitest
beforeEach(() => {
  global.fetch = vi.fn(
    () =>
      Promise.resolve({
        // Simulate a Response object
        json: () =>
          Promise.resolve([
            { id: 1, title: "Post One", body: "Body of Post One" },
            { id: 2, title: "Post Two", body: "Body of Post Two" },
          ]),
      } as Response) // cast as Response type
  );
});

afterEach(() => {
  vi.resetAllMocks(); // Reset fetch mocks between tests
});

describe("Body Component", () => {
  it("renders posts after fetching from API", async () => {
    render(<Body />);

    // Wait for posts to be fetched and rendered
    await waitFor(() =>
      expect(screen.getByText("Post One")).toBeInTheDocument()
    );
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  it("filters posts based on search input", async () => {
    render(<Body />);

    // Wait for posts to be fetched
    await waitFor(() =>
      expect(screen.getByText("Post One")).toBeInTheDocument()
    );

    // Enter a search query
    fireEvent.change(screen.getByPlaceholderText(/Search/i), {
      target: { value: "One" },
    });

    // Only the filtered post should be displayed
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.queryByText("Post Two")).not.toBeInTheDocument();
  });
});
