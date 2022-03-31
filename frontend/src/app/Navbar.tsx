// app/Navbar.tsx
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "../app/hooks";
import {
  fetchNotifications,
  selectAllNotifications,
} from "../features/notifications/notificationsSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const numUnreadNotifications = notifications.filter(n => !n.read).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  const unreadNotificationsBadge =
    numUnreadNotifications > 0 ? (
      <span className="badge">{numUnreadNotifications}</span>
    ) : null;

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
}
