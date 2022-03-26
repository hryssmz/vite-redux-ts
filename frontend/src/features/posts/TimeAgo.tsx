// features/posts/TimeAgo.tsx
import { parseISO, formatDistanceToNow } from "date-fns";

interface Props {
  timestamp: string;
}

export default function TimeAgo({ timestamp }: Props) {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
}