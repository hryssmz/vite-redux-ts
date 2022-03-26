// features/posts/ReactionButtons.tsx
import { useDispatch } from "../../app/hooks";
import { Post, Reaction, reactionAdded } from "./postsSlice";

const reactionEmoji: Record<Reaction, string> = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

interface Props {
  post: Post;
}

export default function ReactionButtons({ post }: Props) {
  const dispatch = useDispatch();

  return (
    <div>
      {(Object.entries(reactionEmoji) as [Reaction, string][]).map(
        ([name, emoji]) => (
          <button
            key={name}
            type="button"
            className="muted-button reaction-button"
            onClick={() =>
              dispatch(reactionAdded({ postId: post.id, reaction: name }))
            }
          >
            {emoji} {post.reactions[name]}
          </button>
        )
      )}
    </div>
  );
}
