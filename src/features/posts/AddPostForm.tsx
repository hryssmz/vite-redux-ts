// features/posts/AddPostForm.tsx
import { useState, ChangeEventHandler, MouseEventHandler } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { useDispatch } from "../../app/hooks";
import { postAdded } from "./postsSlice";

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const onTitleChanged: ChangeEventHandler<HTMLInputElement> = e =>
    setTitle(e.target.value);
  const onContentChanged: ChangeEventHandler<HTMLTextAreaElement> = e =>
    setContent(e.target.value);

  const onSavePostClicked: MouseEventHandler<HTMLButtonElement> = () => {
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        })
      );

      setTitle("");
      setContent("");
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
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
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
}
