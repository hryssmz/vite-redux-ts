// features/posts/SinglePostPage.tsx
import { useParams, Link } from "react-router-dom";

import { useSelector } from "../../app/hooks";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

export default function SinglePostPage() {
  const { postId } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = useSelector(state => selectPostById(state, postId!));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
}
