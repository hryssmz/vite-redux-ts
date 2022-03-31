// features/notifications/NotificationList.tsx
import classnames from "classnames";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useLayoutEffect } from "react";

import { useSelector, useDispatch } from "../../app/hooks";
import {
  allNotificationsRead,
  selectAllNotifications,
} from "./notificationsSlice";
import { selectAllUsers } from "../users/usersSlice";

export default function NotificationsList() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);

  useLayoutEffect(() => {
    dispatch(allNotificationsRead());
  });

  return (
    <section className="notificationList">
      <h2>Notifications</h2>
      {notifications.map(notification => {
        const date = parseISO(notification.date);
        const timeAgo = formatDistanceToNow(date);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const user = users.find(user => user.id === notification.user)!;

        const notificationClassname = classnames("notification", {
          new: notification.isNew,
        });

        return (
          <div key={notification.id} className={notificationClassname}>
            <div>
              <b>{user.name}</b> {notification.message}
            </div>
            <div title={notification.date}>
              <i>{timeAgo} ago</i>
            </div>
          </div>
        );
      })}
    </section>
  );
}
