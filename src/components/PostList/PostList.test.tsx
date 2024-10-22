// PostList.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PostList } from "./PostList";

describe("PostList Component", () => {
  const setPosts = vi.fn(); // Mock the setPosts function
  const mockFetch = vi.fn(); // Mock fetch function globally

  const posts = [
    { id: 1, title: "Post One", body: "Body of Post One" },
    { id: 2, title: "Post Two", body: "Body of Post Two" },
  ];

  beforeEach(() => {
    // Mock the global fetch function
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks between tests
  });

  test("renders posts and shows results count", () => {
    render(<PostList search="" posts={posts} setPosts={setPosts} />);

    // Check if both posts are rendered
    expect(screen.getByText("Results: 2")).toBeInTheDocument();
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  test("filters posts based on search query", () => {
    render(<PostList search="One" posts={posts} setPosts={setPosts} />);

    // Check if the filtered result is correct
    expect(screen.getByText("Results: 1")).toBeInTheDocument();
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.queryByText("Post Two")).not.toBeInTheDocument();
  });

  test("calls fetch to delete a post", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true }); // Mock fetch's successful response

    render(<PostList search="" posts={posts} setPosts={setPosts} />);

    const deleteButtons = await screen.findAllByRole("button", {
      name: /Delete/i,
    });

    // Click the delete button for the first post (Post One)
    await fireEvent.click(deleteButtons[0]);

    // Ensure fetch was called with the correct URL and method
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts/1",
        expect.objectContaining({
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    // Ensure setPosts was called to update the list after deletion
    expect(setPosts).toHaveBeenCalledTimes(1);
  });
});
