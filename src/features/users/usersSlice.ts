// features/users/usersSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import client from "../../utils/client";

export interface User {
  id: string;
  name: string;
}

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
