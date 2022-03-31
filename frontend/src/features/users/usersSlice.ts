// features/users/usersSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import client from "../../utils/client";
import type { RootState } from "../../app/store";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get<User[]>("/fakeApi/users");
  return response.data;
});

export type UsersState = User[];

const initialState: UsersState = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users;

export const selectUserById = (state: RootState, userId: string) =>
  state.users.find(user => user.id === userId);
