// features/users/usersSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
}

export type UsersState = User[];

const initialState: UsersState = [
  { id: "0", name: "Tianna Jenkins" },
  { id: "1", name: "Kevin Grant" },
  { id: "2", name: "Madison Price" },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
