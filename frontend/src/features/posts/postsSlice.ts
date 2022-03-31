// features/posts/postsSlice.ts
import {
  createAsyncThunk,
  createSlice,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import client from "../../utils/client";

export interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get<Post[]>("/fakeApi/posts");
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: InitialPost) => {
    // we send the initial data to the fake API server
    const response = await client.post<Post>("/fakeApi/posts", initialPost);
    // The response includes the complete post object, including unique ID
    return response.data;
  }
);

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

interface PostUpdatedPayload {
  id: string;
  title: string;
  content: string;
}

interface ReactionAddedPayload {
  postId: string;
  reaction: Reaction;
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action: PayloadAction<ReactionAddedPayload>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postUpdated(state, action: PayloadAction<PostUpdatedPayload>) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.error = action.error.message!;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // we can directly add the new post object to our posts array
        state.posts.push(action.payload);
      });
  },
});

export const { postUpdated, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find(post => post.id === postId);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_state, userId: string) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
);

export default postsSlice.reducer;
