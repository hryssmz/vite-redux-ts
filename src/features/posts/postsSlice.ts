// features/posts/postsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: string;
  title: string;
  content: string;
}

export type PostsState = Post[];

const initialState: PostsState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action: PayloadAction<Post>) {
      state.push(action.payload);
    },
  },
});

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
