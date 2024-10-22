import { useEffect, useState } from "react";
import { PostList } from "../PostList/PostList";
import SearchInput from "../SearchInput/SearchInput";

interface Post {
  id: number;
  title: string;
  body: string;
}[];

export const Body = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState<string>("");

  // grab posts data from api route
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // set posts data
        setPosts(data);
      });
  }, []);

  return (
    <div className="app__body">
      <div className="app__files">
        <div className="app__search">
          <SearchInput
            onChangeSearchQuery={(query: string | "") => setQuery(query)}
          />
        </div>
        <PostList posts={posts} setPosts={setPosts} search={query} />
      </div>
    </div>
  );
};
