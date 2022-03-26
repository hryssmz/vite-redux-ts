// features/posts/PostAuthor.tsx
import { useSelector } from "../../app/hooks";

interface Props {
  userId: string;
}

export default function PostAuthor({ userId }: Props) {
  const author = useSelector(state =>
    state.users.find(user => user.id === userId)
  );

  return <span>by {author ? author.name : "Unknown author"}</span>;
}
