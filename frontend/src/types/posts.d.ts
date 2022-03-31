// types/posts.d.ts
type Reaction = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes";

interface Post {
  id: string;
  date: string;
  title: string;
  content: string;
  user: string;
  reactions: Record<Reaction, number>;
}

interface InitialPost {
  title: string;
  content: string;
  user: string;
}
