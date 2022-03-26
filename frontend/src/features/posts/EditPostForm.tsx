// features/posts/EditPostForm.tsx
import { useState, ChangeEventHandler, MouseEventHandler } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "../../app/hooks";
import { postUpdated, selectPostById } from "./postsSlice";

export default function EditPostForm() {
  const { postId } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = useSelector(state => selectPostById(state, postId!))!;

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged: ChangeEventHandler<HTMLInputElement> = e =>
    setTitle(e.target.value);
  const onContentChanged: ChangeEventHandler<HTMLTextAreaElement> = e =>
    setContent(e.target.value);

  const onSavePostClicked: MouseEventHandler<HTMLButtonElement> = () => {
    if (postId && title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
}
