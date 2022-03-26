// features/posts/PostsList.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "../../app/hooks";
import Spinner from "../../components/Spinner";
import { selectAllPosts, fetchPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

export default function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  });

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {postStatus === "loading" ? (
        <Spinner text="Loading..." />
      ) : postStatus === "succeeded" ? (
        posts.map(post => (
          <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
              <PostAuthor userId={post.user} />
              <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>

            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
              View Post
            </Link>
          </article>
        ))
      ) : postStatus === "failed" ? (
        <div>{error}</div>
      ) : null}
    </section>
  );
}
