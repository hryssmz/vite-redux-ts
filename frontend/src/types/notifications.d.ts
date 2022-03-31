// types/notifications.d.ts
interface Notification {
  id: string;
  date: string;
  message: string;
  user: string;
  read: boolean;
  isNew: boolean;
}
