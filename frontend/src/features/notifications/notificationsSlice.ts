// features/notifications/notificationsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { RootState, AsyncThunkConfig } from "../../app/store";
import client from "../../utils/client";

type NotificationsState = Notification[];

const initialState: NotificationsState = [];

export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  AsyncThunkConfig
>("notifications/fetchNotifications", async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState());
  const [latestNotification] = allNotifications;
  const latestTimestamp = latestNotification ? latestNotification.date : "";
  const response = await client.get(`/fakeApi/notifications`, {
    params: { since: latestTimestamp },
  });
  return response.data;
});

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotificationsRead(state) {
      state.forEach(notification => {
        notification.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload);
      state.forEach(notification => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read;
      });
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date));
    });
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications;
