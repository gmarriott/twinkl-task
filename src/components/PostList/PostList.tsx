import { PostItem } from "../PostItem/PostItem";
import "../../assets/styles/post-list.scss";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostListProps {
  search: string;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export const PostList = ({ search, posts, setPosts }: PostListProps) => {
  const deletePost = async (postId: string) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete post with id: ${postId}`);
      }

      setPosts((posts: Post[]) =>
        posts.filter((post) => post.id !== parseInt(postId))
      );
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  if (search !== "") {
    posts = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="list-container">
      <span className="list-length">Results: {posts.length}</span>
      <ul className="post-list">
        {posts.map((post) => {
          return (
            <PostItem
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              deletePost={deletePost}
            />
          );
        })}
      </ul>
    </div>
  );
};
