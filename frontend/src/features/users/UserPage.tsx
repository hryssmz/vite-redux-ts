// features/users/UserPage.tsx
import { useParams, Link } from "react-router-dom";

import { useSelector } from "../../app/hooks";
import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";

export default function UserPage() {
  const { userId } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(state => selectUserById(state, userId!));

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postsForUser = useSelector(state => selectPostsByUser(state, userId!));

  if (!user) {
    return (
      <section>
        <h2>User not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>
        {postsForUser.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
