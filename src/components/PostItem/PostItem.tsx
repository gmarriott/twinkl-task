import "../../assets/styles/post-item.scss";

interface PostItemProps {
  id: number;
  title: string;
  body: string;
  deletePost: Function;
}

export const PostItem = ({ id, title, body, deletePost }: PostItemProps) => {
  return (
    <div className="post-container">
      <span className="post-details">
        <span className="post-title">
          <b>Title: </b>
          {title}
        </span>
        <span className="post-body">
          <b>Body: </b>
          {body}
        </span>
      </span>
      <span className="post-action">
        <button onClick={() => deletePost(id)}>Delete</button>
      </span>
    </div>
  );
};
